// ===== CONFIGURAZIONE API =====
// URL /exec della tua WebApp Apps Script
const API = "https://script.google.com/macros/s/AKfycbzs_c7X9MmZNDBrXzmqHsH4U4BVYomilCVOfCvIDolN2tNkZfM2v55Vl6h8sGJISYIn/exec";

let currentUser = null;
let isBusy = false;
let allUsers = [];
let ctUsers = []; // cambio turno solo in memoria

// ===== TOAST =====
function toast(msg) {
  const t = document.getElementById("toast");
  t.textContent = msg;
  t.style.display = "block";
  setTimeout(() => {
    t.style.display = "none";
  }, 2200);
}

// ===== LOCK / UNLOCK PULSANTI =====
function lock() {
  isBusy = true;
  document.querySelectorAll("button").forEach(b => b.disabled = true);
}
function unlock() {
  isBusy = false;
  document.querySelectorAll("button").forEach(b => b.disabled = false);
}

// ===== CHIAMATA API GENERICA =====
function apiCall(params) {
  const url = API + "?" + new URLSearchParams(params).toString();
  return fetch(url).then(r => r.json());
}

// ===== MOSTRA / NASCONDI BOX =====
function showLogin() {
  boxLogin.classList.remove("hidden");
  boxComplete.classList.add("hidden");
  boxDashboard.classList.add("hidden");
  boxCambioTurno.classList.add("hidden");
}

function showComplete() {
  boxLogin.classList.add("hidden");
  boxComplete.classList.remove("hidden");
  boxDashboard.classList.add("hidden");
  boxCambioTurno.classList.add("hidden");
}

function showDashboard() {
  boxLogin.classList.add("hidden");
  boxComplete.classList.add("hidden");
  boxDashboard.classList.remove("hidden");
  boxCambioTurno.classList.add("hidden");
}

// ===== CARICA UTENTI =====
function loadUsers() {
  apiCall({ action: "getUsers" })
    .then(res => {
      if (!res.success) {
        toast("Errore caricamento utenti");
        return;
      }
      const sel = document.getElementById("selUser");
      sel.innerHTML = '<option value="">Seleziona utente</option>';
      res.users.forEach(u => {
        const opt = document.createElement("option");
        opt.value = u;
        opt.textContent = u;
        sel.appendChild(opt);
      });
      allUsers = res.users;
    })
    .catch(() => {
      toast("Errore rete (utenti)");
    });
}

function loadUserDetails() {
  return apiCall({ action: "getUsersFull" })
    .then(res => {
      if (res.success) {
        window.userDetails = res.data; // { username: { matricola: "01234", email: "..."} }
      }
    });
}


// ===== LOGIN =====
function doLogin() {
  if (isBusy) return;
  lock();

  const username = selUser.value;
  const pinVal   = pin.value.trim();

  if (!username) {
    toast("Seleziona un utente");
    unlock();
    return;
  }
  if (!/^\d{6}$/.test(pinVal)) {
    toast("PIN non valido (6 cifre)");
    unlock();
    return;
  }

  apiCall({ action: "login", username, pin: pinVal })
    .then(res => {
      if (!res.success) {
        toast(res.message || "Login fallito");
        unlock();
        return;
      }

      currentUser = res.user;
      localStorage.setItem("sessionUser", JSON.stringify(currentUser));

      if (!currentUser.email || !currentUser.matricola) {
        email.value     = currentUser.email || "";
        matricola.value = currentUser.matricola || "";
        showComplete();
      } else {
        fillDashboard();
        showDashboard();
      }

      unlock();
    })
    .catch(() => {
      toast("Errore rete (login)");
      unlock();
    });
}

// ===== COMPLETA DATI DOPO LOGIN =====
function doComplete() {
  if (isBusy) return;
  lock();

  const emailVal = email.value.trim();
  const matVal   = matricola.value.trim();

  if (!/^[^@]+@[^@]+\.[^@]+$/.test(emailVal)) {
    toast("Email non valida");
    unlock();
    return;
  }
  if (!/^\d{5}$/.test(matVal)) {
    toast("Matricola non valida (5 cifre)");
    unlock();
    return;
  }

  const payload = {
    action:    "saveProfile",
    username:  currentUser.username,
    pin:       currentUser.pin,
    email:     emailVal,
    matricola: matVal
  };

  apiCall(payload)
    .then(res => {
      if (!res.success) {
        toast(res.message || "Errore salvataggio");
        unlock();
        return;
      }

      currentUser.email     = emailVal;
      currentUser.matricola = matVal;
      localStorage.setItem("sessionUser", JSON.stringify(currentUser));

      fillDashboard();
      showDashboard();
      toast("Dati salvati");
      unlock();
    })
    .catch(() => {
      toast("Errore rete (salvataggio)");
      unlock();
    });
}

// ===== RIEMPI DASHBOARD =====
function fillDashboard() {
  d_user.value = currentUser.username;
  d_pin.value  = currentUser.pin;
  d_email.value = currentUser.email || "";
  d_mat.value   = currentUser.matricola || "";
}

// ===== SALVA DA DASHBOARD =====
function doSaveDashboard() {
  if (isBusy) return;
  lock();

  const pinVal  = d_pin.value.trim();
  const mailVal = d_email.value.trim();
  const matVal  = d_mat.value.trim();

  if (!/^\d{6}$/.test(pinVal)) {
    toast("PIN non valido (6 cifre)");
    unlock();
    return;
  }
  if (!/^[^@]+@[^@]+\.[^@]+$/.test(mailVal)) {
    toast("Email non valida");
    unlock();
    return;
  }
  if (!/^\d{5}$/.test(matVal)) {
    toast("Matricola non valida (5 cifre)");
    unlock();
    return;
  }

  const payload = {
    action:    "saveProfile",
    username:  currentUser.username,
    pin:       pinVal,
    email:     mailVal,
    matricola: matVal
  };

  apiCall(payload)
    .then(res => {
      if (!res.success) {
        toast(res.message || "Errore salvataggio");
        unlock();
        return;
      }

      currentUser.pin       = pinVal;
      currentUser.email     = mailVal;
      currentUser.matricola = matVal;
      localStorage.setItem("sessionUser", JSON.stringify(currentUser));

      toast("Dati aggiornati");
      unlock();
    })
    .catch(() => {
      toast("Errore rete (salvataggio)");
      unlock();
    });
}

// ===== RIPRISTINA SESSIONE =====
function restoreSession() {
  const saved = localStorage.getItem("sessionUser");
  if (!saved) {
    showLogin();
    return;
  }

  try {
    const user = JSON.parse(saved);
    if (!user || !user.username || !user.pin) {
      showLogin();
      return;
    }

    apiCall({ action: "login", username: user.username, pin: user.pin })
      .then(res => {
        if (!res.success) {
          localStorage.removeItem("sessionUser");
          showLogin();
          return;
        }

        currentUser = res.user;

        if (!currentUser.email || !currentUser.matricola) {
          email.value     = currentUser.email || "";
          matricola.value = currentUser.matricola || "";
          showComplete();
        } else {
          fillDashboard();
          showDashboard();
        }
      })
      .catch(() => {
        showLogin();
      });

  } catch (e) {
    showLogin();
  }
}

// ===== CAMBIO TURNO (solo lato client) =====
function showCambioTurno() {
  boxCambioTurno.classList.remove("hidden");
  if (ctUsers.length === 0) {
    ctUsers = [
      { user: currentUser.username, turno: "" },
      { user: "", turno: "" }
    ];
  }
  renderCambioTurno();
}

function renderCambioTurno() {
  const container = ct_container;
  container.innerHTML = "";

  ctUsers.forEach((u, index) => {
    const row = document.createElement("div");
    row.className = "row";

    const colUser = document.createElement("div");
    if (index === 0) {
      colUser.innerHTML = `<input type="text" value="${currentUser.username}" disabled>`;
    } else {
      let options = `<option value="">Seleziona utente</option>`;
      allUsers.forEach(name => {
        options += `<option value="${name}" ${name === u.user ? "selected" : ""}>${name}</option>`;
      });
      colUser.innerHTML = `<select data-index="${index}" class="ct_user">${options}</select>`;
    }

    const colTurno = document.createElement("div");
    colTurno.innerHTML = `
      <input type="text" class="ct_turno" data-index="${index}" placeholder="Turno" value="${u.turno || ""}">
    `;

    row.appendChild(colUser);
    row.appendChild(colTurno);
    container.appendChild(row);
  });

  document.querySelectorAll(".ct_user").forEach(sel => {
    sel.addEventListener("change", e => {
      const i = Number(e.target.dataset.index);
      ctUsers[i].user = e.target.value;
    });
  });

  document.querySelectorAll(".ct_turno").forEach(inp => {
    inp.addEventListener("input", e => {
      const i = Number(e.target.dataset.index);
      ctUsers[i].turno = e.target.value.trim();
    });
  });
}

function addCambioTurnoUser() {
  if (ctUsers.length >= 10) {
    toast("Max 10 utenti");
    return;
  }
  ctUsers.push({ user: "", turno: "" });
  renderCambioTurno();
}

function saveCambioTurno() {
  if (isBusy) return;
  lock();

  const dateVal = ct_date.value.trim();
  if (!dateVal) {
    toast("Inserisci una data");
    unlock();
    return;
  }

  // formato gg-mm-aaaa
  const d = new Date(dateVal);
  const dd = String(d.getDate()).padStart(2, "0");
  const mm = String(d.getMonth() + 1).padStart(2, "0");
  const yyyy = d.getFullYear();
  const dateFormatted = `${dd}-${mm}-${yyyy}`;

  if (ctUsers.length < 2) {
    toast("Inserisci almeno 2 utenti");
    unlock();
    return;
  }

  for (let i = 0; i < ctUsers.length; i++) {
    const u = ctUsers[i];

    if (i > 0 && !u.user) {
      toast("Seleziona tutti gli utenti");
      unlock();
      return;
    }
    if (!/^\d{2,3}$/.test(u.turno)) {
      toast("Turno non valido (2-3 cifre)");
      unlock();
      return;
    }
  }

  let out = `DATA: ${dateFormatted}<br><br>`;

  ctUsers.forEach(u => {
    const mat = window.userDetails[u.user]?.matricola || "00000";
    out += `${u.user} matr ${mat} turno ${u.turno} A${u.turno}<br>`;
  });

  ct_output.innerHTML = out;

  unlock();
}

function copyCambioTurno() {
  const text = ct_output.innerText;  // prende il riepilogo così com’è
  navigator.clipboard.writeText(text)
    .then(() => toast("Copiato negli appunti"))
    .catch(() => toast("Errore copia"));
}

// ===== INIT =====
document.addEventListener("DOMContentLoaded", () => {
  // cache elementi
  window.boxLogin       = document.getElementById("boxLogin");
  window.boxComplete    = document.getElementById("boxComplete");
  window.boxDashboard   = document.getElementById("boxDashboard");
  window.boxCambioTurno = document.getElementById("boxCambioTurno");

  window.selUser   = document.getElementById("selUser");
  window.pin       = document.getElementById("pin");
  window.email     = document.getElementById("email");
  window.matricola = document.getElementById("matricola");

  window.d_user = document.getElementById("d_user");
  window.d_pin  = document.getElementById("d_pin");
  window.d_email = document.getElementById("d_email");
  window.d_mat   = document.getElementById("d_mat");

  window.ct_container = document.getElementById("ct_container");
  window.ct_output    = document.getElementById("ct_output");

  const btnLogin       = document.getElementById("btnLogin");
  const btnComplete    = document.getElementById("btnComplete");
  const btnSave        = document.getElementById("btnSave");
  const btnCambioTurno = document.getElementById("btnCambioTurno");
  const ct_addUser     = document.getElementById("ct_addUser");
  const ct_save        = document.getElementById("ct_save");

  btnLogin.addEventListener("click", doLogin);
  btnComplete.addEventListener("click", doComplete);
  btnSave.addEventListener("click", doSaveDashboard);
  btnCambioTurno.addEventListener("click", showCambioTurno);
  ct_addUser.addEventListener("click", addCambioTurnoUser);
  ct_save.addEventListener("click", saveCambioTurno);
document.getElementById("ct_copy").addEventListener("click", copyCambioTurno);

  loadUsers();
  loadUserDetails();

  restoreSession();
});

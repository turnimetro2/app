// ===== CONFIGURAZIONE API =====
// URL /exec della tua WebApp Apps Script
const API = "https://script.google.com/macros/s/AKfycbzs_c7X9MmZNDBrXzmqHsH4U4BVYomilCVOfCvIDolN2tNkZfM2v55Vl6h8sGJISYIn/exec";

let currentUser = null;
let isBusy = false;
let allUsers = [];
let ctUsers = []; // cambio turno solo in memoria

function backToProfile() {
  boxCambioTurno.classList.add("hidden");
  boxDashboard.classList.remove("hidden");
}

function checkDashboardChanges() {
  const changed =
    d_pin.value.trim() !== currentUser.pin ||
    d_email.value.trim() !== currentUser.email ||
    d_mat.value.trim() !== currentUser.matricola;

  btnSave.disabled = !changed;
}


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

loadUserDetails().then(() => {
  fillDashboard();
  showDashboard();
  toast("Dati salvati");
  unlock();
});


      
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

  btnSave.disabled = true;

  
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

loadUserDetails().then(() => {
  toast("Dati aggiornati");
  unlock();
});

    })
    .catch(() => {
      toast("Errore rete (salvataggio)");
      unlock();
    });
}

function doLogout() {
  localStorage.removeItem("sessionUser");
  currentUser = null;

  // pulizia eventuali dati cambio turno
  ctUsers = [];
  ct_output.innerHTML = "";
  ct_emails.innerHTML = "";
  ct_date.value = "";

  showLogin();
  toast("Logout effettuato");
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
  boxDashboard.classList.add("hidden");
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
      let options = `<option value="">Seleziona collega</option>`;
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
  if (ctUsers.length >= 15) {
    toast("Max 15 utenti");
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

  // validazione utenti e turni + raccolta per controlli duplicati
  const seenUsers = new Set();
  const seenTurni = new Set();
  let duplicateUser = null;
  let duplicateTurno = null;

  for (let i = 0; i < ctUsers.length; i++) {
    const u = ctUsers[i];

    if (i > 0 && !u.user) {
      toast("Seleziona tutti gli utenti");
      unlock();
      return;
    }

    
if (!/^[A-Za-z0-9]{2,3}$/.test(u.turno)) {
  toast("Turno non valido (2-3 caratteri alfanumerici)");
  unlock();
  return;
}


    // controllo duplicati utente (considero solo quelli selezionati)
    if (i > 0 && u.user) {
      if (seenUsers.has(u.user)) {
        duplicateUser = u.user;
      } else {
        seenUsers.add(u.user);
      }
    }


  }

  if (duplicateUser) {
    toast("Utente selezionato più di una volta");
    unlock();
    return;
  }



  // costruzione riepilogo principale
  let out = `${dateFormatted}\n\n`;

  const missingEmailUsers = [];
  const missingMatUsers   = [];

  ctUsers.forEach(u => {
    const details = window.userDetails?.[u.user] || {};
    const mat = details.matricola || "-";

    if (!details.email) {
      missingEmailUsers.push(u.user);
    }
    if (!details.matricola) {
      missingMatUsers.push(u.user);
    }

    out += `${u.user} matr ${mat} turno A${u.turno}\n`;
  });

  ct_output.innerText = out;

  // costruzione elenco email destinatari (escludendo l'utente loggato e chi non ha email)
  const emailParts = [];
  ctUsers.forEach((u, index) => {
    if (index === 0) return; // salta utente loggato
    const details = window.userDetails?.[u.user];
    if (!details || !details.email) return;
    if (details.email === currentUser.email) return;

    emailParts.push(`${u.user} <${details.email}>`);
  });

  const emailText = emailParts.join(" , ");
  ct_emails.innerText = emailText;

  // notifica se mancano email o matricola per qualcuno
  if (missingEmailUsers.length > 0 || missingMatUsers.length > 0) {
    toast("Attenzione: uno o piu' colleghi selezionati non hanno ancora registrato email o matricola");
  }
  
  unlock();
}

function copyCambioTurno() {
  const text = ct_output.innerText;  // prende il riepilogo così com’è
  if (!text.trim()) {
    toast("Nessun riepilogo da copiare");
    return;
  }
  navigator.clipboard.writeText(text)
    .then(() => toast("Copiato negli appunti"))
    .catch(() => toast("Errore copia"));
}

function copyCambioTurnoEmails() {
  const text = ct_emails.innerText;
  if (!text.trim()) {
    toast("Nessun destinatario da copiare");
    return;
  }
  navigator.clipboard.writeText(text)
    .then(() => toast("Destinatari copiati"))
    .catch(() => toast("Errore copia"));
}

function resetCambioTurno() {
  ctUsers = [
    { user: currentUser.username, turno: "" },
    { user: "", turno: "" }
  ];

  ct_date.value = "";        // reset data
  ct_output.innerHTML = "";  // reset riepilogo
  ct_emails.innerHTML = "";  // reset elenco email

  renderCambioTurno();
  toast("Reset effettuato");
}

// ===== INIT =====
document.addEventListener("DOMContentLoaded", () => {

  d_pin.addEventListener("input", checkDashboardChanges);
d_email.addEventListener("input", checkDashboardChanges);
d_mat.addEventListener("input", checkDashboardChanges);

  
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
  window.ct_emails    = document.getElementById("ct_emails");

  const btnLogin       = document.getElementById("btnLogin");
  const btnComplete    = document.getElementById("btnComplete");
  const btnSave        = document.getElementById("btnSave");
  const btnLogout = document.getElementById("btnLogout");
  const btnCambioTurno = document.getElementById("btnCambioTurno");
  const ct_addUser     = document.getElementById("ct_addUser");
  const ct_save        = document.getElementById("ct_save");
  const ct_copy        = document.getElementById("ct_copy");
  const ct_copyEmails  = document.getElementById("ct_copyEmails");
  const ct_resetBtn    = document.getElementById("ct_reset");

  const ct_backProfile = document.getElementById("ct_backProfile");
ct_backProfile.addEventListener("click", backToProfile);

  
const btnLogout2 = document.getElementById("btnLogout2");
btnLogout2.addEventListener("click", doLogout);
  
  btnLogin.addEventListener("click", doLogin);
  btnComplete.addEventListener("click", doComplete);
  btnSave.addEventListener("click", doSaveDashboard);
  btnLogout.addEventListener("click", doLogout);  // <--- AGGIUNTO

  btnCambioTurno.addEventListener("click", showCambioTurno);

  ct_addUser.addEventListener("click", addCambioTurnoUser);
  ct_save.addEventListener("click", saveCambioTurno);
  ct_copy.addEventListener("click", copyCambioTurno);
  ct_copyEmails.addEventListener("click", copyCambioTurnoEmails);
  ct_resetBtn.addEventListener("click", resetCambioTurno);

  loadUsers();
  loadUserDetails();
  restoreSession();
});

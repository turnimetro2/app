// ===== CONFIGURAZIONE API =====
const API = "https://script.google.com/macros/s/AKfycbyV3gZOi6Y9bm5z2czQv3T3I4wZL2OFgaH7K5mU5zM0iK7H7JuH-mIsUJYNdq2QeTA8/exec";

let currentUser = null;
let isBusy = false;
window.allUsers = [];

// ===== ELEMENTI =====
const boxLogin = document.getElementById("boxLogin");
const boxComplete = document.getElementById("boxComplete");
const boxDashboard = document.getElementById("boxDashboard");
const boxCambioTurno = document.getElementById("boxCambioTurno");

const selUser = document.getElementById("selUser");
const pinInput = document.getElementById("pin");

const email = document.getElementById("email");
const matricola = document.getElementById("matricola");

const d_user = document.getElementById("d_user");
const d_pin = document.getElementById("d_pin");
const d_email = document.getElementById("d_email");
const d_mat = document.getElementById("d_mat");

const btnLogin = document.getElementById("btnLogin");
const btnComplete = document.getElementById("btnComplete");
const btnSave = document.getElementById("btnSave");

const btnCambioTurno = document.getElementById("btnCambioTurno");

const ct_container = document.getElementById("ct_container");
const ct_addUser = document.getElementById("ct_addUser");
const ct_save = document.getElementById("ct_save");
const ct_output = document.getElementById("ct_output");

// ===== TOAST =====
function toast(msg) {
  const t = document.getElementById("toast");
  t.textContent = msg;
  t.style.display = "block";

  setTimeout(() => {
    t.style.display = "none";
  }, 2200);
}

// ===== LOCK =====
function lock() {
  isBusy = true;
  document.querySelectorAll("button")
    .forEach(b => b.disabled = true);
}

function unlock() {
  isBusy = false;
  document.querySelectorAll("button")
    .forEach(b => b.disabled = false);
}

// ===== API =====
async function apiCall(params) {

  try {

    // ===== GET USERS =====
    if (params.action === "getUsers") {

      const url =
        API +
        "?action=getUsers&t=" +
        Date.now();

      const res = await fetch(url, {
        method: "GET",
        redirect: "follow"
      });

      const text = await res.text();

      console.log("GET USERS RAW:", text);

      return JSON.parse(text);
    }

    // ===== POST =====
    const res = await fetch(API, {
      method: "POST",
      redirect: "follow",
      headers: {
        "Content-Type": "text/plain;charset=utf-8"
      },
      body: JSON.stringify(params)
    });

    const text = await res.text();

    console.log("POST RAW:", text);

    return JSON.parse(text);

  } catch (err) {

    console.error(err);

    return {
      success: false,
      message: "Errore rete/API"
    };
  }
}

// ===== LOAD USERS =====
async function loadUsers() {

  try {

    const res = await apiCall({
      action: "getUsers"
    });

    if (!res.success) {
      toast("Errore caricamento utenti");
      return;
    }

    selUser.innerHTML =
      '<option value="">Seleziona utente</option>';

    if (!Array.isArray(res.users)) {
      toast("Formato utenti non valido");
      return;
    }

    window.allUsers = res.users;

    res.users.forEach(user => {

      const opt = document.createElement("option");

      opt.value = user;
      opt.textContent = user;

      selUser.appendChild(opt);
    });

  } catch (err) {

    console.error(err);

    toast("Errore rete utenti");

    selUser.innerHTML =
      '<option value="">Errore caricamento</option>';
  }
}

// ===== SHOW BOX =====
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

// ===== LOGIN =====
async function doLogin() {

  if (isBusy) return;

  lock();

  const username = selUser.value.trim();
  const pin = pinInput.value.trim();

  if (!username) {
    toast("Seleziona utente");
    unlock();
    return;
  }

  if (!/^\d{6}$/.test(pin)) {
    toast("PIN non valido");
    unlock();
    return;
  }

  const res = await apiCall({
    action: "login",
    username,
    pin
  });

  if (!res.success) {
    toast(res.message || "Login fallito");
    unlock();
    return;
  }

  currentUser = res.user;

  localStorage.setItem(
    "sessionUser",
    JSON.stringify(currentUser)
  );

  if (
    !currentUser.email ||
    !currentUser.matricola
  ) {

    email.value = currentUser.email || "";
    matricola.value = currentUser.matricola || "";

    showComplete();

  } else {

    fillDashboard();
    showDashboard();
  }

  unlock();
}

// ===== COMPLETE =====
async function doComplete() {

  if (isBusy) return;

  lock();

  const emailVal = email.value.trim();
  const matVal = matricola.value.trim();

  if (!/^[^@]+@[^@]+\.[^@]+$/.test(emailVal)) {
    toast("Email non valida");
    unlock();
    return;
  }

  if (!/^\d{5}$/.test(matVal)) {
    toast("Matricola non valida");
    unlock();
    return;
  }

  const res = await apiCall({
    action: "saveProfile",
    username: currentUser.username,
    pin: currentUser.pin,
    email: emailVal,
    matricola: matVal
  });

  if (!res.success) {
    toast(res.message || "Errore salvataggio");
    unlock();
    return;
  }

  currentUser.email = emailVal;
  currentUser.matricola = matVal;

  localStorage.setItem(
    "sessionUser",
    JSON.stringify(currentUser)
  );

  fillDashboard();
  showDashboard();

  toast("Dati salvati");

  unlock();
}

// ===== DASHBOARD =====
function fillDashboard() {

  d_user.value = currentUser.username;
  d_pin.value = currentUser.pin;
  d_email.value = currentUser.email || "";
  d_mat.value = currentUser.matricola || "";
}

// ===== SAVE DASHBOARD =====
async function doSaveDashboard() {

  if (isBusy) return;

  lock();

  const pinVal = d_pin.value.trim();
  const emailVal = d_email.value.trim();
  const matVal = d_mat.value.trim();

  if (!/^\d{6}$/.test(pinVal)) {
    toast("PIN non valido");
    unlock();
    return;
  }

  if (!/^[^@]+@[^@]+\.[^@]+$/.test(emailVal)) {
    toast("Email non valida");
    unlock();
    return;
  }

  if (!/^\d{5}$/.test(matVal)) {
    toast("Matricola non valida");
    unlock();
    return;
  }

  const res = await apiCall({
    action: "saveProfile",
    username: currentUser.username,
    pin: pinVal,
    email: emailVal,
    matricola: matVal
  });

  if (!res.success) {
    toast(res.message || "Errore salvataggio");
    unlock();
    return;
  }

  currentUser.pin = pinVal;
  currentUser.email = emailVal;
  currentUser.matricola = matVal;

  localStorage.setItem(
    "sessionUser",
    JSON.stringify(currentUser)
  );

  toast("Dati aggiornati");

  unlock();
}

// ===== RESTORE =====
async function restoreSession() {

  const saved =
    localStorage.getItem("sessionUser");

  if (!saved) {
    showLogin();
    return;
  }

  try {

    const user = JSON.parse(saved);

    const res = await apiCall({
      action: "login",
      username: user.username,
      pin: user.pin
    });

    if (!res.success) {

      localStorage.removeItem("sessionUser");

      showLogin();

      return;
    }

    currentUser = res.user;

    fillDashboard();

    showDashboard();

  } catch (err) {

    console.error(err);

    showLogin();
  }
}

// ===== CAMBIO TURNO =====
let ctUsers = [];

function showCambioTurno() {

  boxCambioTurno.classList.remove("hidden");

  renderCambioTurno();
}

function renderCambioTurno() {

  ct_container.innerHTML = "";

  ctUsers.forEach((u, index) => {

    const row = document.createElement("div");

    row.className = "row";

    const colUser = document.createElement("div");

    if (index === 0) {

      colUser.innerHTML =
        `<input type="text" value="${currentUser.username}" disabled>`;

    } else {

      let options =
        `<option value="">Seleziona utente</option>`;

      window.allUsers.forEach(name => {

        options += `
          <option value="${name}"
          ${name === u.user ? "selected" : ""}>
          ${name}
          </option>
        `;
      });

      colUser.innerHTML =
        `<select data-index="${index}" class="ct_user">${options}</select>`;
    }

    const colTurno = document.createElement("div");

    colTurno.innerHTML = `
      <input
        type="text"
        class="ct_turno"
        data-index="${index}"
        placeholder="Turno"
        value="${u.turno || ""}">
    `;

    row.appendChild(colUser);
    row.appendChild(colTurno);

    ct_container.appendChild(row);
  });

  document.querySelectorAll(".ct_user")
    .forEach(sel => {

      sel.addEventListener("change", e => {

        const i =
          Number(e.target.dataset.index);

        ctUsers[i].user =
          e.target.value;
      });
    });

  document.querySelectorAll(".ct_turno")
    .forEach(inp => {

      inp.addEventListener("input", e => {

        const i =
          Number(e.target.dataset.index);

        ctUsers[i].turno =
          e.target.value.trim();
      });
    });
}

function addCambioTurnoUser() {

  if (ctUsers.length >= 10) {
    toast("Max 10 utenti");
    return;
  }

  ctUsers.push({
    user: "",
    turno: ""
  });

  renderCambioTurno();
}

function saveCambioTurno() {

  for (let i = 0; i < ctUsers.length; i++) {

    const u = ctUsers[i];

    if (i > 0 && !u.user) {
      toast("Seleziona utenti");
      return;
    }

    if (!/^\d{2,3}$/.test(u.turno)) {
      toast("Turno non valido");
      return;
    }
  }

  let out =
    "<b>Riepilogo cambio turno:</b><br><br>";

  ctUsers.forEach(u => {

    out += `${u.user} → turno ${u.turno}<br>`;
  });

  ct_output.innerHTML = out;
}

// ===== INIT =====
document.addEventListener("DOMContentLoaded", () => {

  btnLogin.addEventListener("click", doLogin);

  btnComplete.addEventListener(
    "click",
    doComplete
  );

  btnSave.addEventListener(
    "click",
    doSaveDashboard
  );

  btnCambioTurno.addEventListener(
    "click",
    () => {

      ctUsers = [{
        user: currentUser.username,
        turno: ""
      }];

      showCambioTurno();
    }
  );

  ct_addUser.addEventListener(
    "click",
    addCambioTurnoUser
  );

  ct_save.addEventListener(
    "click",
    saveCambioTurno
  );

  loadUsers();

  restoreSession();
});

// ===== CONFIGURAZIONE API =====
// URL /exec della tua WebApp Apps Script
const API = "https://script.google.com/macros/s/AKfycbzs_c7X9MmZNDBrXzmqHsH4U4BVYomilCVOfCvIDolN2tNkZfM2v55Vl6h8sGJISYIn/exec";


// ===== CICLAZIONE PERENNE =====
const CYCLE_START = new Date("2025-05-19");

const CYCLING = [
"253","72","D1","R","165","154","83",
"122","D1","R","134","223","967","132",
"201","R","204","D4","23","212","941",
"R","195","214","D3","33","242","R",
"124","973","223","42","221","R","R",
"153","163","302","101","918","R","D4",
"82","101","12","71","R","165","194",
"72","152","D1","R","185","94","43",
"192","835","R","44","184","D3","182",
"D1","R","274","D3","283","132","81",
"R","84","892","73","D2","231","R",
"D4","193","74","262","151","61","R",
"243","D3","203","966","301","R","134",
"22","142","934","11","R","24","D4",
"52","191","101","R","225","D4","133",
"940","31","R","144","253","123","32",
"D1","R","998","154","34","92","201",
"R","104","D4","153","92","71","R",
"264","967","133","142","272","151","R",
"183","D2","152","D1","31","R","998",
"13","302","281","191","R","144","D3",
"262","121","61","R","245","D4","22",
"837","181","R","195","D4","223","12",
"191","R","84","214","24","D1","918",
"R","165","D3","22","192","211","R",
"D4","234","183","32","182","941","R",
"223","162","202","936","61","R","84",
"303","222","935","51","R","235","123",
"966","12","81","R","285","44","D3",
"32","D1","R","892","43","23","42",
"151","R","254","203","D2","251","919",
"R","D4","253","183","213","12","R",
"24","253","D2","141","72","261","R",
"184","D3","192","181","271","R","64",
"869","202","232","271","51","R","124",
"212","D2","835","81","R","184","D3",
"252","301","131","R","D4","113","13",
"271","936","R","D4","93","D2","71",
"231","R","234","133","967","62","191",
"R","34","54","74","D2","81","R",
"224","93","212","92","D1","241","R",
"63","62","182","281","919","R","63",
"42","71","918","R","45","234","D3",
"202","151","R","274","144","263","162",
"835","R","224","234","D3","262","21",
"R","134","D3","273","D2","171","R",
"204","164","243","D2","935","R","R",
"283","64","242","21","D1","R","184",
"23","52","41","919","R","14","D4",
"163","32","161","R","234","64","967",
"242","D1","R","145","14","183","D2",
"141","R","25","303","133","82","837",
"R","204","D4","283","22","31","R",
"304","184","272","222","940","101","R",
"154","103","132","935","81","R","D3",
"142","252","201","R","D4","93","122",
"941","11","R","125","154","153","D2",
"91","R","65","164","123","D2","131",
"R","15","123","182","121","919","R",
"194","14","D3","192","222","R","R",
"195","214","233","252","D1","R","892",
"123","D2","D2","121","R","55","D4",
"302","51","919","R","74","224","D2",
"121","231","R","65","254","D3","211",
"919","R","195","24","103","53","111",
"R","D4","53","213","52","141","R",
"998","194","83","233","212","201","R",
"164","13","142","211","936","R","105",
"D3","213","82","61","R","265","153",
"D2","131","936","R","26","84","D3",
"222","221","R","14","94","D3","212",
"161","R","194","967","73","192","121",
"R","145","184","13","D3","52","R",
"44","254","973","163","82","182","R",
"34","153","D2","D1","21","R","54",
"193","869","22","91","R","34","D4",
"233","182","261","R","64","D4","203",
"81","918","R","204","194","143","92",
"D1","R","145","94","83","222","835",
"R","304","94","54","132","D1","R",
"244","124","273","D2","241","21","R",
"892","143","13","242","91","R","44",
"203","242","837","D1","R","75","D4",
"133","262","141","R","44","264","163",
"934","D1","R","84","224","D3","192",
"21","R","304","55","244","33","D1",
"R","998","24","64","243","232","R",
"65","24","144","43","42","966","R",
"D4","23","252","122","261","R","104",
"263","22","221","72","934","R","D4",
"54","122","62","D1","R","164","183",
"241","192","121","R","304","D4","869",
"31","D1","R","165","892","163","82",
"101","R","165","15","164","73","91",
"R","75","103","973","152","111","R",
"D4","243","193","132","202","181","R",
"D4","53","162","934","201","R","D4",
"83","232","241","R","274","74","73",
"D2","41","R","244","15","973","202",
"51","R","125","253","54","D2","151",
"R","44","263","93","966","122","R",
"84","33","163","D2","D2","R","R",
"973","73","32","232","281","R","214",
"43","D2","31","151","R","35","34",
"967","D3","21","R","126","214","143",
"12","934","R","284","D4","253","142",
"211","R","284","194","35","173","935",
"R","D4","23","162","869","142","R",
"145","274","143","D2","D2","51","R",
"74","283","966","212","191","R","113",
"162","212","91","D1","R","15","D4",
"102","D1","181","R","204","892","193",
"61","271","R","D4","145","203","102",
"935","R","264","D4","13","172","171",
"R","55","93","202","232","936","R",
"274","54","122","263","32","D1","R",
"273","263","D2","221","231","R","33",
"103","132","102","940","R","104","D3",
"D3","281","71","R","D4","D4","D2",
"281","935","R","264","55","133","D2",
"D1","R","75","D3","183","202","11",
"R","154","213","D2","262","91","R",
"104","D4","153","302","41","918","R",
"165","D3","52","D1","181","R","115",
"D3","42","940","161","R","204","103",
"D2","201","271","R","25","254","62",
"301","837","R","34","153","213","D2",
"131","R","D4","123","63","72","934",
"R","284","124","D3","142","221","R",
"134","273","D2","251","62","161","R",
"15","63","72","D3","837","R","24",
"93","102","211","102","D1","R","204",
"64","D2","D1","31","R","998","114",
"152","211","301","R","284","83","72",
"936","81","R","75","193","152","41",
"918","R","55","83","163","13","51",
"R","125","154","103","162","940","R",
"234","144","43","12","161","41","R",
"213","223","222","201","941","R","D3",
"182","261","151","R","95","244","D3",
"D2","941","R","104","134","43","152",
"D1","R","44","33","143","252","936",
"R","264","34","63","302","D1","R",
"144","43","D2","41","835","R","R",
"73","83","D2","131","251","R","93",
"232","282","191","918","R","105","23",
"D2","251","D1","R","65","54","966",
"251","241","R","304","233","193","141",
"11","R","D4","223","973","102","61",
"R","94","303","62","12","934","R",
"254","123","63","52","11","11","R",
"D3","92","262","941","71","R","74",
"53","D2","D1","231","R","114","53",
"272","940","11","R","146","D4","213",
"282","141","R","998","125","233","52",
"181","R","134","23","D3","112","181",
"R","224","15","53","242","935","R",
"25","D4","64","152","252","121","R",
"14","892","D3","82","141","R","144",
"143","272","92","837","R","124","D3",
"92","61","51","R","998","134","173",
"41","91","R","D4","214","243","172",
"221","R","244","184","273","869","161",
"R","244","14","243","53","835","R",
"94","74","D3","143","122","191","R",
"214","203","282","D1","101","R","174",
"D3","966","231","241","R","205","164",
"D3","82","941","R","265","D4","973",
"132","161","R","25","264","63","112",
"71","R","104","124","203","162","940",
"R","25","33","254","D3","42","R",
"284","303","967","272","282","131","R",
"55","233","283","D2","D1","R","14",
"D3","133","869","301","131","R","195",
"33","D2","251","261","R","145","D4",
"62","21","D1","R","84","174","D2",
"D1","919","R","224","124","103","D2",
"261","R","D4","193","303","22","31",
"R","65","164","869","263","32","R",
"125","D3","73","282","102","837","R",
"75","183","42","835","211","R","154"
];

  
let currentUser = null;
let isBusy = false;
let allUsers = [];
let ctUsers = []; // cambio turno solo in memoria

function backToProfile() {
  boxCambioTurno.classList.add("hidden");
  boxDashboard.classList.remove("hidden");
}

function getRealTurno(username, dateVal) {
  const row = window.userDetails?.[username]?.riga; // colonna E
  if (!row) return null;

  const offset = (Number(row) - 1) * 7;

  const d0 = CYCLE_START;
  const d1 = new Date(dateVal);
  const diffDays = Math.floor((d1 - d0) / (1000 * 60 * 60 * 24));

  const index = (offset + diffDays) % CYCLING.length;
  return CYCLING[index];
}




function togglePasswordVisibility(input, icon, pathElement) {
  const eyeOpen = "M12 5c-7 0-11 7-11 7s4 7 11 7 11-7 11-7-4-7-11-7zm0 12a5 5 0 110-10 5 5 0 010 10z";
  const eyeClosed = "M1 1l22 22M12 5c-7 0-11 7-11 7 1.5 2.6 4.5 5.5 8 6m6 0c3.5-0.5 6.5-3.4 8-6 0 0-4-7-11-7-1.5 0-2.9 0.3-4.2 0.8";

  if (input.type === "password") {
    input.type = "text";
    icon.style.opacity = "0.9";
    pathElement.setAttribute("d", eyeClosed);
  } else {
    input.type = "password";
    icon.style.opacity = "0.55";
    pathElement.setAttribute("d", eyeOpen);
  }
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

      // 🔥 Carica TUTTI i dettagli utenti UNA SOLA VOLTA
      return loadUserDetails().then(() => {
        if (!currentUser.email || !currentUser.matricola) {
          email.value     = currentUser.email || "";
          matricola.value = currentUser.matricola || "";
          showComplete();
        } else {
          fillDashboard();
          showDashboard();
        }

        unlock();
      });
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
  // aggiorna anche i dettagli in memoria
  window.userDetails[currentUser.username] = {
    pin: currentUser.pin,
    email: currentUser.email,
    matricola: currentUser.matricola
  };

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

  btnSave.disabled = true;   // 🔥 blocca il pulsante finché non ci sono modifiche
}

function checkDashboardChanges() {
  const changed =
    d_pin.value.trim() !== currentUser.pin ||
    d_email.value.trim() !== currentUser.email ||
    d_mat.value.trim() !== currentUser.matricola;

  btnSave.disabled = !changed;
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
  // aggiorna anche i dettagli in memoria
  window.userDetails[currentUser.username] = {
    pin: currentUser.pin,
    email: currentUser.email,
    matricola: currentUser.matricola
  };

  fillDashboard();
  showDashboard();
  toast("Dati aggiornati");
  unlock();
  checkDashboardChanges();   // 🔥 evita che il pulsante resti attivo dopo il salvataggio

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

function showLoader() {
  document.getElementById("loaderOverlay").style.display = "flex";
}

function hideLoader() {
  document.getElementById("loaderOverlay").style.display = "none";
}


// ===== RIPRISTINA SESSIONE =====
function restoreSession() {
  const saved = localStorage.getItem("sessionUser");
  if (!saved) {
    showLogin();
    return;
  }

  showLoader();   // 🔥 Mostra loader subito

  try {
    const user = JSON.parse(saved);
    if (!user || !user.username || !user.pin) {
      hideLoader();
      showLogin();
      return;
    }

    apiCall({ action: "login", username: user.username, pin: user.pin })
      .then(res => {
        if (!res.success) {
          localStorage.removeItem("sessionUser");
          hideLoader();
          showLogin();
          return;
        }

        currentUser = res.user;

        // 🔥 Carica TUTTI i dettagli utenti UNA SOLA VOLTA
        return loadUserDetails().then(() => {

          hideLoader();   // 🔥 Nascondi loader appena finito

          if (!currentUser.email || !currentUser.matricola) {
            email.value     = currentUser.email || "";
            matricola.value = currentUser.matricola || "";
            showComplete();
          } else {
            fillDashboard();
            showDashboard();
          }
        });
      })
      .catch(() => {
        hideLoader();
        showLogin();
      });

  } catch (e) {
    hideLoader();
    showLogin();
  }
}


// ===== CAMBIO TURNO (solo lato client) =====


function sendCambioTurnoEmail() {
  const body = ct_output.innerText.trim();
  const cc   = ct_emails.innerText.trim();

  if (!body) {
    toast("Genera prima il riepilogo");
    return;
  }

  // Oggetto fisso
  const subject = "CAMBIO TURNO";

  // Costruzione mailto
  let mailto = "mailto:?";

  mailto += "subject=" + encodeURIComponent(subject);
  mailto += "&body=" + encodeURIComponent(body);

  if (cc) {
    mailto += "&cc=" + encodeURIComponent(cc);
  }

  // Apertura app email di default
  window.location.href = mailto;
}


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
     <input type="text" class="ct_turno" maxlength="3" data-index="${index}" placeholder="Turno" value="${u.turno || ""}">

    `;

    row.appendChild(colUser);
    row.appendChild(colTurno);

// Pulsante elimina (solo per index >= 2)
let colRemove = document.createElement("div");
if (index >= 2) {
  colRemove.innerHTML = `
    <button class="ct_remove" data-index="${index}">X</button>
  `;
}
row.appendChild(colRemove);

    
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

  document.querySelectorAll(".ct_remove").forEach(btn => {
  btn.addEventListener("click", e => {
    const i = Number(e.target.dataset.index);
    ctUsers.splice(i, 1);
    renderCambioTurno();
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
      toast("Seleziona tutti i colleghi");
      unlock();
      return;
    }

    
if (!/^[A-Za-z0-9]{2,3}$/.test(u.turno)) {
  toast("Turno non valido (2-3 caratteri)");
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
    toast("Collega selezionato più di una volta");
    unlock();
    return;
  }

// ===== CONTROLLO TURNI DI CICLAZIONE =====
const invalidTurns = [];

ctUsers.forEach(u => {
  if (!u.turno) return;

  const turnoUtente = u.turno.trim().toUpperCase();
  let match = false;

  ctUsers.forEach(c => {
    const real = getRealTurno(c.user, dateVal);
    if (real && real.toUpperCase() === turnoUtente) match = true;
  });

  if (!match) invalidTurns.push(turnoUtente);
});

if (invalidTurns.length > 0) {
  toast("Attenzione!\nI seguenti turni non appartengono alla ciclazione di alcun collega:\n" + invalidTurns.join(", "));
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
    toast("Attenzione!\n uno o piu' colleghi selezionati non hanno ancora registrato email o matricola");
  }
  
  unlock();
}

function copyCambioTurno() {
  const text = ct_output.innerText;  // prende il riepilogo così com’è
  if (!text.trim()) {
    toast("Nessun corpo mail da copiare");
    return;
  }
  navigator.clipboard.writeText(text)
    .then(() => toast("Corpo mail copiato"))
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

ct_date.addEventListener("change", () => {
  const today = new Date();
  const selected = new Date(ct_date.value);

  // Calcola intervallo valido
  const min = new Date();
  min.setDate(today.getDate() + 6);

  const max = new Date();
  max.setDate(today.getDate() + 20);

  // Solo notifica, NON blocca l'uso
  if (selected < min || selected > max) {
    toast("Attenzione!\n la data selezionata è fuori dal range 7–20 giorni da oggi");
  }
});
  
  
document.getElementById("togglePinLogin").addEventListener("click", () => {
  togglePasswordVisibility(pin, togglePinLogin, togglePinLoginPath);
});

document.getElementById("togglePinProfile").addEventListener("click", () => {
  togglePasswordVisibility(d_pin, togglePinProfile, togglePinProfilePath);
});

  
  const ct_sendMail = document.getElementById("ct_sendMail");
ct_sendMail.addEventListener("click", sendCambioTurnoEmail);

  
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

  d_pin.addEventListener("input", checkDashboardChanges);
d_email.addEventListener("input", checkDashboardChanges);
d_mat.addEventListener("input", checkDashboardChanges);

  
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

  restoreSession();
});

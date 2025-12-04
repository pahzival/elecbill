// ---------- Page Switching ----------
function show(page) {
    const pages = [
        "landingPage",
        "loginPage",
        "registerPage",
        "dashboardPage",
        "profilePage",
        "calculatorPage"
    ];

    pages.forEach(p => {
        document.getElementById(p).classList.add("hidden");
    });

    document.getElementById(page).classList.remove("hidden");
}

function showLanding() { show("landingPage"); }
function showLogin() { show("loginPage"); }
function showRegister() { show("registerPage"); }
function showDashboard() { loadHistory(); show("dashboardPage"); }
function showProfile() {
    document.getElementById("profileEmail").innerText =
        localStorage.getItem("userEmail");
    show("profilePage");
}
function showCalculator() { show("calculatorPage"); }

// ---------- Authentication ----------
function register() {
    const email = document.getElementById("regEmail").value.trim();
    const pass = document.getElementById("regPass").value.trim();

    if (!email || !pass) {
        alert("Please enter an email and password.");
        return;
    }

    localStorage.setItem("userEmail", email);
    localStorage.setItem("userPass", pass);

    alert("Account created! You can now login.");
    showLogin();
}

function login() {
    const email = document.getElementById("loginEmail").value.trim();
    const pass = document.getElementById("loginPass").value.trim();

    if (email === localStorage.getItem("userEmail") &&
        pass === localStorage.getItem("userPass")) {
        showDashboard();
    } else {
        alert("Invalid email or password.");
    }
}

function logout() {
    showLanding();
}

// ---------- Bill Calculator ----------
function calculateBill() {
    const m = document.getElementById("month").value.trim();
    const k = parseFloat(document.getElementById("kwh").value);
    const r = parseFloat(document.getElementById("rate").value);

    if (!m || isNaN(k) || isNaN(r)) {
        document.getElementById("result").innerText = "Invalid input";
        return;
    }

    const total = (k * r).toFixed(2);

    document.getElementById("result").innerHTML =
        `Bill for <b>${m}</b>: $${total}`;

    saveBill(m, total);
}

function saveBill(month, total) {
    const bills = JSON.parse(localStorage.getItem("bills") || "[]");

    bills.push({ month, total });
    localStorage.setItem("bills", JSON.stringify(bills));
}

// ---------- Bill History ----------
function loadHistory() {
    const bills = JSON.parse(localStorage.getItem("bills") || "[]");

    document.getElementById("billCount").innerText = bills.length;

    const list = bills.map((b, i) => `
        <div class="bill-item">
            <strong>${b.month}</strong> — $${b.total}
            <button class="delete-btn" onclick="deleteBill(${i})">Delete</button>
        </div>
    `).join("");

    document.getElementById("historyList").innerHTML = list;
}

function deleteBill(index) {
    const bills = JSON.parse(localStorage.getItem("bills") || "[]");

    bills.splice(index, 1);

    localStorage.setItem("bills", JSON.stringify(bills));
    loadHistory();
}

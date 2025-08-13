// --- LOGIN ---
function login() {
    let user = document.getElementById('username')?.value.trim();
    let pass = document.getElementById('password')?.value.trim();
    let errorEl = document.getElementById('error');

    if (user === 'admin' && pass === 'admin@123') {
        localStorage.setItem("loggedIn", "true");
        window.location.href = "dashboard.html";
    } else {
        if (errorEl) errorEl.innerText = "Invalid credentials!";
    }
}

// --- SHOW / HIDE PASSWORD ---
function togglePassword() {
    let passField = document.getElementById('password');
    passField.type = (passField.type === "password") ? "text" : "password";
}

// --- LOGOUT ---
function logout() {
    localStorage.removeItem("loggedIn");
    window.location.href = "index.html";
}

// --- DASHBOARD AUTH CHECK ---
if (window.location.pathname.includes("dashboard.html")) {
    if (localStorage.getItem("loggedIn") !== "true") {
        window.location.href = "index.html";
    }
}

// --- ADD PRODUCT ---
function addProduct() {
    let name = document.getElementById('productName').value.trim();
    let price = document.getElementById('productPrice').value.trim();
    let stock = document.getElementById('productStock').value.trim();
    let desc = document.getElementById('productDescription').value.trim();
    let errorEl = document.getElementById('product-error');
    let tableBody = document.querySelector('#productTable tbody');
    let totalProductsEl = document.getElementById('total-products');

    if (!name || !price || !stock || !desc) {
        errorEl.innerText = "All fields are required!";
        return;
    } else {
        errorEl.innerText = "";
    }

    let row = tableBody.insertRow();
    row.insertCell(0).innerText = name;
    row.insertCell(1).innerText = `₹${price}`;
    row.insertCell(2).innerText = stock;
    row.insertCell(3).innerText = desc;

    // Add Delete Icon
    let deleteCell = row.insertCell(4);
    deleteCell.innerHTML = `<span style="cursor:pointer; color:red; font-size:18px;" onclick="deleteProduct(this)">🗑</span>`;

    totalProductsEl.innerText = tableBody.rows.length;

    // Clear fields
    document.getElementById('productName').value = "";
    document.getElementById('productPrice').value = "";
    document.getElementById('productStock').value = "";
    document.getElementById('productDescription').value = "";
}

// --- DELETE PRODUCT ---
function deleteProduct(btn) {
    let row = btn.parentElement.parentElement;
    row.remove();

    // Update total count
    let tableBody = document.querySelector('#productTable tbody');
    document.getElementById('total-products').innerText = tableBody.rows.length;
}

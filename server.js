const express = require("express");
const path = require("path");

const app = express();
const PORT = 5000;

/* =========================
   MIDDLEWARE
   ========================= */
app.use(express.json());
app.use(express.static("public"));

/* =========================
   TEMP DATABASE (IN MEMORY)
   ========================= */
let users = [];
let orders = [];

/* =========================
   REGISTER API
   ========================= */
app.post("/api/register", (req, res) => {
    const { username, password } = req.body;

    const exists = users.find(u => u.username === username);

    if (exists) {
        return res.json({ message: "User already exists" });
    }

    users.push({ username, password });

    res.json({ message: "Registered Successfully" });
});

/* =========================
   LOGIN API
   ========================= */
app.post("/api/login", (req, res) => {
    const { username, password } = req.body;

    const user = users.find(
        u => u.username === username && u.password === password
    );

    if (!user) {
        return res.json({ message: "Invalid credentials" });
    }

    res.json({ message: "Login Success" });
});

/* =========================
   ORDER API (PLACE ORDER)
   ========================= */
app.post("/api/order", (req, res) => {
    const { items, total } = req.body;

    const order = {
        id: Date.now(),
        items,
        total
    };

    orders.push(order);

    res.json({ message: "Order placed successfully", order });
});

/* =========================
   GET ALL ORDERS (ADMIN / DEBUG)
   ========================= */
app.get("/api/orders", (req, res) => {
    res.json(orders);
});

/* =========================
   START SERVER
   ========================= */
app.listen(PORT, () => {
    console.log("Server running on port " + PORT);
});
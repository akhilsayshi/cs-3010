
const express = require("express");
const cors = require("cors");
const bcrypt = require("bcrypt");
const pool = require("./db");

const app = express();
const PORT = 3001;

// Middleware
app.use(cors());
app.use(express.json());


// POST /api/login
// Accepts login credentials, checks DB, returns 200/400/401
app.post("/api/login", async (req, res) => {
  const { username, password } = req.body;
  try {
    const userResult = await pool.query(
      "SELECT id, password FROM user_accounts WHERE username = $1",
      [username]
    );
    if (userResult.rows.length === 0) {
      return res.status(400).json({ message: "No account with that username." });
    }
    const user = userResult.rows[0];
    const match = await bcrypt.compare(password, user.password);
    if (!match) {
      return res.status(401).json({ message: "Incorrect password." });
    }
    return res.status(200).json({ id: user.id });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
});


// POST /api/register
// Accepts registration data, inserts into DB, returns 201/409
app.post("/api/register", async (req, res) => {
  const { username, password } = req.body;
  try {
    const exists = await pool.query(
      "SELECT id FROM user_accounts WHERE username = $1",
      [username]
    );
    if (exists.rows.length > 0) {
      return res.status(409).json({ message: "Username already exists." });
    }
    const hashed = await bcrypt.hash(password, 10);
    const insert = await pool.query(
      "INSERT INTO user_accounts (username, password) VALUES ($1, $2) RETURNING id",
      [username, hashed]
    );
    return res.status(201).json({ id: insert.rows[0].id });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
});


// POST /api/account
// Upsert account details for a user
app.post("/api/account", async (req, res) => {
  const { user_id, full_name, email, address, phone } = req.body;
  try {
    // Try update first
    const update = await pool.query(
      `UPDATE user_account_details SET full_name = $1, email = $2, address = $3, phone = $4 WHERE user_id = $5 RETURNING *`,
      [full_name, email, address, phone, user_id]
    );
    if (update.rows.length > 0) {
      return res.status(200).json(update.rows[0]);
    }
    // If not updated, insert
    const insert = await pool.query(
      `INSERT INTO user_account_details (user_id, full_name, email, address, phone) VALUES ($1, $2, $3, $4, $5) RETURNING *`,
      [user_id, full_name, email, address, phone]
    );
    return res.status(201).json(insert.rows[0]);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
});


// GET /api/account?user_id=<user_id>
// Returns account details for the given user_id
app.get("/api/account", async (req, res) => {
  const { user_id } = req.query;
  try {
    const details = await pool.query(
      "SELECT * FROM user_account_details WHERE user_id = $1",
      [user_id]
    );
    if (details.rows.length === 0) {
      return res.status(204).send();
    }
    return res.status(200).json(details.rows[0]);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});

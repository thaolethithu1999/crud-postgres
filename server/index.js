const express = require("express");
const cors = require("cors");
const pool = require("./db");
const app = express();

app.use(cors());
app.use(express.json());

//routes

//create
app.post("/", async (req, res) => {
  try {
    console.log(req.body);

    const { username } = req.body;
    const { email } = res.body;
    const { phone } = res.body;
    const { dob } = res.body;

    const newUser = await pool.query(
      "INSERT INTO users(username, email, phone, dob) VALUES($1, $2, $3, $4) RETURNING *",
      [username, email, phone, dob]
    );

    res.json(newUser);
  } catch (err) {
    console.log(err.message);
  }
});

// get all
app.get("/", async (req, res) => {
  try {
    const allUser = await pool.query("SELECT * FROM users");
    res.json(allUser.rows);
  } catch (err) {
    console.log(err.message);
  }
});

// get a
app.get("/user/:id", async (req, res) => {
  try {
    const { id } = req.params;

    const user = await pool.query("SELECT * FROM users WHERE id = $1", [id]);

    res.json(user.rows[0]);
  } catch (err) {
    console.log(err.message);
  }
});

// update
app.put("/user/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const { username } = req.body;
    const updateUser = await pool.query(
      "UPDATE users SET username = $1 WHERE id = $2",
      [username, id]
    );

    res.json("Updated");
  } catch (err) {
    console.log(err.message);
  }
});

// delete
app.delete("/user/:id", async (req, res) => {
  try {
    const { id } = req.params;

    const deleteUser = await pool.query("DELETE FROM users WHERE id = $1", [
      id,
    ]);

    res.json("Deleted");
  } catch (err) {
    console.log(err.message);
  }
});

app.listen(3000, () => {
  console.log(`Server is running on port `);
});

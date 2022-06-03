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

    // const { username } = req.body;
    // const { email } = res.body;
    // const { phone } = res.body;
    // const { dob } = res.body;

    const newUser = await pool.query(
      "INSERT INTO users(username, email, phone, dob) VALUES('user1','user1@gmail.com', '111111111', '11/11/2011') RETURNING *"
    );

    res.json(newUser);
  } catch (err) {
    console.log(err.message);
  }
});

// get all

// get a

// update

// delete

app.listen(3000, () => {
  console.log(`Server is running on port `);
});

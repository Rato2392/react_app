const express = require("express");
const router = express.Router();
const pool = require("../db");
const bcrypt = require("bcrypt");
const jwtGenerator = require("../utils/jwtGenerator");
const validInfo = require("../middleware/validinfo");
const authorization = require("../middleware/authorization.js");
//routes//

//create users

router.post("/register", validInfo, async (req, res) => {
  //1. destructure req.body (first_name,last_name,email,institute,password)
  const { first_name, last_name, email, institute, users_password } = req.body;
  try {
    //2. check if user exist
    const users = await pool.query("SELECT * FROM users WHERE email = $1", [
      email,
    ]);
    if (users.rows.length !== 0) {
      return res.status(401).json("User already exist");
    }

    //3 Bcrypt the user password
    const saltRound = 10;
    const salt = await bcrypt.genSalt(saltRound);

    const bcryptPassword = await bcrypt.hash(users_password, salt);
    //4. enter the new user insde our database

    const newUsers = await pool.query(
      "INSERT INTO users (first_name, last_name, email, institute, users_password) VALUES ($1,$2,$3,$4,$5) RETURNING *",
      [first_name, last_name, email, institute, bcryptPassword]
    );

    //5. generating our jwt token
    const jwttoken = jwtGenerator(newUsers.rows[0].users_id);
    res.json({ jwttoken });
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

//login user

router.post("/login", validInfo, async (req, res) => {
  //1. destructure req.body
  const { email, users_password } = req.body;
  try {
    //2. check if user doesnt exist (if not throw error)

    const users = await pool.query("SELECT * FROM users WHERE email= $1", [
      email,
    ]);
    if (users.rows.length === 0) {
      return res.status(401).json("Email doesn't exist");
    }

    //3. check if incoming is the same as the database password

    const validPassword = await bcrypt.compare(
      users_password,
      users.rows[0].users_password
    );

    if (!validPassword) {
      return res.status(401).json("Password is incorrect");
    }

    //4. give them the jwt token

    const jwttoken = jwtGenerator(users.rows[0].users_id);
    res.json({ jwttoken });
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

//is user verified

router.get("/isverify", authorization, async (req, res) => {
  try {
    res.json(true);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

//get all users

router.get("/users", async (req, res) => {
  try {
    const allUsers = await pool.query("SELECT * FROM users");
    res.json(allUsers.rows);
  } catch (err) {
    console.error(err.message);
  }
});

//get a users

router.get("/users/:users_id", async (req, res) => {
  try {
    const { users_id } = req.params;
    const oneUser = await pool.query(
      "SELECT * FROM users WHERE users_id = $1",
      [users_id]
    );
    res.json(oneUser.rows[0]);
  } catch (err) {
    console.error(err.message);
  }
});

//update a users

router.put("/users/:users_id", async (req, res) => {
  try {
    const { users_id } = req.params;
    const { first_name } = req.body;
    const updateUser = await pool.query(
      "UPDATE users SET first_name = $1 WHERE users_id = $2",
      [first_name, users_id]
    );
    res.json("user was updated");
  } catch (err) {
    console.error(err.message);
  }
});

//delete a users

router.delete("/users/:users_id", async (req, res) => {
  try {
    const { users_id } = req.params;
    const deleteUser = await pool.query(
      "DELETE FROM users WHERE users_id = $1",
      [users_id]
    );
    res.json("users was deleted");
  } catch (err) {
    console.error(err.message);
  }
});

module.exports = router;

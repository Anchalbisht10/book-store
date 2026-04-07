const db = require("../db");
const bcrypt=require("bcrypt");

exports.getUsers = async (req, res, next) => {
  try {
    const [rows] = await db.query(
      "SELECT id,name,email FROM users"
    );
    res.json(rows);
  } catch (err) {
    next(err);
  }
};

exports.createUser = async (req, res, next) => {
  const { name, email, password } = req.body;

  try {
    const hashed=await bcrypt.hash(password || "default123",10);
    await db.query(
      "INSERT INTO users (name,email,password) VALUES (?,?,?)",
      [name, email, password || "default123"]
    );

    res.json({ message: "User created" });

  } catch (err) {
    next(err);
  }
};

exports.updateUser = async (req, res, next) => {
  const { id } = req.params;
  const { name, email } = req.body;

  try {
    await db.query(
      "UPDATE users SET name=?,email=? WHERE id=?",
      [name, email, id]
    );

    res.json({ message: `User ${id} updated` });

  } catch (err) {
    next(err);
  }
};

exports.deleteUser = async (req, res, next) => {
  const { id } = req.params;

  try {
    await db.query(
      "DELETE FROM users WHERE id=?",
      [id]
    );

    res.json({ message: `User ${id} deleted` });

  } catch (err) {
    next(err);
  }
};
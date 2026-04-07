const db = require("../db");

// GET all books
exports.getBooks = async (req, res, next) => {
  try {
    const [rows] = await db.query("SELECT * FROM books ORDER BY created_at DESC");
    res.json(rows);
  } catch (err) {
    next(err);
  }
};

// CREATE a book
exports.createBook = async (req, res, next) => {
  const { title, author, price, stock, image_url, description } = req.body;

  try {
    const [result] = await db.query(
      "INSERT INTO books (title, author, price, stock, image_url, description) VALUES (?, ?, ?, ?, ?, ?)",
      [title, author, price, stock, image_url, description]
    );

    res.json({
      message: "Book added successfully",
      id: result.insertId,
    });
  } catch (err) {
    next(err);
  }
};

// UPDATE a book
exports.updateBook = async (req, res, next) => {
  const { id } = req.params;
  const { title, author, price, stock, image_url, description } = req.body;

  try {
    await db.query(
      "UPDATE books SET title=?, author=?, price=?, stock=?, image_url=?, description=? WHERE id=?",
      [title, author, price, stock, image_url, description, id]
    );

    res.json({ message: `Book ${id} updated successfully` });
  } catch (err) {
    next(err);
  }
};

// DELETE a book
exports.deleteBook = async (req, res, next) => {
  const { id } = req.params;

  try {
    await db.query("DELETE FROM books WHERE id=?", [id]);
    res.json({ message: `Book ${id} deleted successfully` });
  } catch (err) {
    next(err);
  }
};
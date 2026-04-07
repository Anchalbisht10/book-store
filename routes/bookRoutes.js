const express = require("express");
const router = express.Router();

const bookController = require("../controllers/bookController");
const authMiddleware = require("../middleware/authMiddleware");

// safety check (optional but helps debugging)
// console.log("bookController:", bookController);
// console.log("authMiddleware:", typeof authMiddleware);

// Routes
router.get("/books", authMiddleware, bookController.getBooks);
router.post("/books", authMiddleware, bookController.createBook);
router.put("/books/:id", authMiddleware, bookController.updateBook);
router.delete("/books/:id", authMiddleware, bookController.deleteBook);

module.exports = router;
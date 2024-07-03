const express = require("express");
const {
  addBook,
  updateBook,
  deleteBook,
  getAllBooks,
  getBookDetails,
  searchBooks,
  borrowBook,
  returnBook,
  getBorrowedBooks,
  getAllBorrowedBooks,
} = require("../controllers/bookController");
const { auth, admin } = require("../middleware/auth");

const router = express.Router();

// Admin routes
router.post("/add", auth, admin, addBook);
router.put("/update/:id", auth, admin, updateBook);
router.delete("/delete/:id", auth, admin, deleteBook);
router.get('/borrowed/all', auth, admin, getAllBorrowedBooks);

// User routes
router.get("/", auth, getAllBooks);
router.get("/borrowed", auth, getBorrowedBooks);
router.get("/search", auth, searchBooks);
router.post("/borrow/:id", auth, borrowBook);
router.post("/return/:id", auth, returnBook);
router.get("/:id", auth, getBookDetails);

module.exports = router;

const Book = require('../models/Book');

// Add a new book
const addBook = async (req, res) => {
  const { title, author, genre, publishedDate, ISBN } = req.body;
  try {
    const newBook = new Book({ title, author, genre, publishedDate, ISBN });
    await newBook.save();
    res.status(201).send(newBook);
  } catch (error) {
    res.status(400).send({ error: 'Error adding book.' });
  }
};

// Update book details
const updateBook = async (req, res) => {
  const { id } = req.params;
  const updates = req.body;
  try {
    const book = await Book.findByIdAndUpdate(id, updates, { new: true, runValidators: true });
    if (!book) {
      return res.status(404).send({ error: 'Book not found.' });
    }
    res.send(book);
  } catch (error) {
    res.status(400).send({ error: 'Error updating book.' });
  }
};

// Delete a book
const deleteBook = async (req, res) => {
  const { id } = req.params;
  try {
    const book = await Book.findByIdAndDelete(id);
    if (!book) {
      return res.status(404).send({ error: 'Book not found.' });
    }
    res.send({ message: 'Book deleted successfully.' });
  } catch (error) {
    res.status(400).send({ error: 'Error deleting book.' });
  }
};

// View list of all books
const getAllBooks = async (req, res) => {
  try {
    const books = await Book.find();
    res.send(books);
  } catch (error) {
    res.status(500).send({ error: 'Error fetching books.' });
  }
};

// View details of a single book
const getBookDetails = async (req, res) => {
  const { id } = req.params;
  try {
    const book = await Book.findById(id);
    if (!book) {
      return res.status(404).send({ error: 'Book not found.' });
    }
    res.send(book);
  } catch (error) {
    res.status(500).send({ error: 'Error fetching book details.' });
  }
};

// Search for books
const searchBooks = async (req, res) => {
  const { query } = req.query;
  try {
    const books = await Book.find({
      $or: [
        { title: new RegExp(query, 'i') },
        { author: new RegExp(query, 'i') },
        { genre: new RegExp(query, 'i') }
      ]
    });
    res.send(books);
  } catch (error) {
    res.status(500).send({ error: 'Error searching books.' });
  }
};

// Borrow a book
const borrowBook = async (req, res) => {
  const { id } = req.params;
  try {
    const book = await Book.findById(id);
    if (!book) {
      return res.status(404).send({ error: 'Book not found.' });
    }
    if (book.borrowedBy) {
      return res.status(400).send({ error: 'Book already borrowed.' });
    }
    book.borrowedBy = req.user._id;
    await book.save();
    res.send(book);
  } catch (error) {
    res.status(500).send({ error: 'Error borrowing book.' });
  }
};

// Return a borrowed book
const returnBook = async (req, res) => {
  const { id } = req.params;
  try {
    const book = await Book.findById(id);
    if (!book) {
      return res.status(404).send({ error: 'Book not found.' });
    }
    if (!book.borrowedBy) {
      return res.status(400).send({ error: 'Book is not borrowed.' });
    }
    if (book.borrowedBy.toString() !== req.user._id.toString()) {
      return res.status(403).send({ error: 'You can only return books you borrowed.' });
    }
    book.borrowedBy = null;
    await book.save();
    res.send(book);
  } catch (error) {
    res.status(500).send({ error: 'Error returning book.' });
  }
};

// View list of borrowed books for a user
const getBorrowedBooks = async (req, res) => {
  try {
    const books = await Book.find({ borrowedBy: req.user.id });
    res.send(books);
  } catch (error) {
    res.status(500).send({ error: 'Error fetching borrowed books.' });
  }
};

// View list of all borrowed books for admin
const getAllBorrowedBooks = async (req, res) => {
  try {
    const books = await Book.find({ borrowedBy: { $ne: null } }).populate('borrowedBy', 'name email');
    res.send(books);
  } catch (error) {
    res.status(500).send({ error: 'Error fetching borrowed books.' });
  }
};

module.exports = {
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
};

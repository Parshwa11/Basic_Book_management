import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Header from "./components/Header";
import Footer from "./components/Footer";
import BookList from "./components/BookList";
import BookDetails from "./components/BookDetails";
import AddBook from "./pages/admin/AddBook";
import UpdateBook from "./pages/admin/UpdateBook";
import BorrowedBooks from "./pages/admin/BorrowedBooks";
import Auth from "./pages/Auth";

const App = () => {
  return (
    <Router>
      <Header />
      <Routes>
        <Route path="/" element={<BookList />} />
        <Route path="/books/borrowed" element={<BorrowedBooks />} />
        <Route path="/admin/add-book" element={<AddBook />} />
        <Route path="/admin/borrowed-books" element={<BorrowedBooks />} />
        <Route path="/admin/update-book/:id" element={<UpdateBook />} />
        <Route path="/books/:id" element={<BookDetails />} />
        <Route path="/auth" element={<Auth />} />
      </Routes>
      <Footer />
    </Router>
  );
};

export default App;

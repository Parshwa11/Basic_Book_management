import React, { useState, useEffect } from "react";
import { fetchBorrowedBooks } from "../../api";
import { Link } from "react-router-dom";

const BorrowedBooks = () => {
  const checkifAdminorNot = () => {
    const profile = JSON.parse(localStorage.getItem("profile"));
    if (profile?.user?.role === "admin") {
      return true;
    } else {
      return false;
    }
  };

  const [borrowedBooks, setBorrowedBooks] = useState([]);
  const [isAdmin, setIsAdmin] = useState(checkifAdminorNot());

  useEffect(() => {
    const profile = JSON.parse(localStorage.getItem("profile"));
    if (profile?.user?.role === "admin") {
      setIsAdmin(true);
    }

    const getBorrowedBooks = async () => {
      try {
        const { data } = await fetchBorrowedBooks(isAdmin);
        setBorrowedBooks(data);
      } catch (error) {
        console.error(error);
      }
    };

    getBorrowedBooks();
  }, [isAdmin]);

  return (
    <div>
      <h1>Borrowed Books</h1>
      <ul>
        {borrowedBooks?.map((book) => (
          <li key={book._id}>
            <p>
              Title: <Link to={`/books/${book._id}`}>{book.title}</Link>
            </p>
            {isAdmin && (
              <>
                <p>Borrowed by: {book.borrowedBy?.name}</p>
                <p>Email: {book.borrowedBy?.email}</p>
              </>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default BorrowedBooks;

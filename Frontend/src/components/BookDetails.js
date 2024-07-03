import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { fetchBookById, borrowBook, returnBook, deleteBook } from "../api";

const BookDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [book, setBook] = useState(null);
  const [isBorrowed, setIsBorrowed] = useState(false);
  const user = JSON.parse(localStorage.getItem("profile"));

  useEffect(() => {
    const getBook = async () => {
      try {
        const { data } = await fetchBookById(id);
        setBook(data);

        if (data.borrowedBy && data.borrowedBy === user?.user?._id) {
          setIsBorrowed(true);
        } else {
          setIsBorrowed(false);
        }
      } catch (error) {
        console.error(error);
      }
    };

    getBook();
  }, [id, user?.user?._id]);

  const handleBorrow = async () => {
    try {
      await borrowBook(id);
      setIsBorrowed(true);
      navigate("/");
    } catch (error) {
      console.error(error);
    }
  };

  const handleReturn = async () => {
    try {
      await returnBook(id);
      setIsBorrowed(false);
      navigate("/");
    } catch (error) {
      console.error(error);
    }
  };

  const handleDelete = async () => {
    try {
      await deleteBook(id);
      navigate("/");
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div>
      {book && (
        <>
          <h1>{book.title}</h1>
          <p>Author: {book.author}</p>
          <p>Genre: {book.genre}</p>
          <p>Published Date: {book.publishedDate}</p>
          <p>ISBN: {book.ISBN}</p>
          {user?.user?.role === "admin" ? (
            <>
              <button onClick={handleDelete}>Delete</button>
              <button onClick={() => navigate(`/admin/update-book/${id}`)}>
                Update
              </button>
            </>
          ) : (
            <>
              {!isBorrowed ? (
                <button onClick={handleBorrow}>Borrow</button>
              ) : (
                <button onClick={handleReturn}>Return</button>
              )}
            </>
          )}
        </>
      )}
    </div>
  );
};

export default BookDetails;

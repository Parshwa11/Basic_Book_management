import React, { useState, useEffect } from "react";
import { searchBooks, fetchBooks } from "../api";
import { Link, useLocation, useNavigate } from "react-router-dom";

const BookList = () => {
  const [books, setBooks] = useState([]);
  const query = new URLSearchParams(useLocation().search);
  const searchQuery = query.get("query");
  const navigate = useNavigate();

  const [profile, setProfile] = useState(
    JSON.parse(localStorage.getItem("profile"))
  );

  useEffect(() => {
    const getBooks = async () => {
      try {
        const { data } = searchQuery
          ? await searchBooks(searchQuery)
          : await fetchBooks();
        setBooks(data);
      } catch (error) {
        console.error("Error fetching books:", error);
      }
    };

    getBooks();
  }, [searchQuery]);

  const handleSearch = async (e) => {
    e.preventDefault();
    const queryValue = e.target.elements.searchQuery.value.trim();
    if (queryValue) {
      try {
        const { data } = await searchBooks(queryValue);
        setBooks(data);
      } catch (error) {
        console.error("Error searching books:", error);
      }
    } else {
      try {
        const { data } = await fetchBooks();
        setBooks(data);
        navigate("/");
      } catch (error) {
        console.error("Error fetching books:", error);
      }
    }
  };

  const handleInputChange = async (e) => {
    const queryValue = e.target.value.trim();
    if (!queryValue) {
      try {
        const { data } = await fetchBooks();
        setBooks(data);
        navigate("/");
      } catch (error) {
        console.error("Error fetching books:", error);
      }
    }
  };

  return (
    <div>
      {profile ? (
        <div>
          <h1>Books</h1>
          <form onSubmit={handleSearch}>
            <input
              type="text"
              name="searchQuery"
              placeholder="Search by title, author, or genre"
              onChange={handleInputChange}
            />
            <button type="submit">Search</button>
          </form>
          <ul>
            {books.map((book) => (
              <li key={book._id}>
                <Link to={`/books/${book._id}`}>
                  {book.title} - {book.genre} - {book.author}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      ) : (
        <h1>Books Management</h1>
      )}
    </div>
  );
};

export default BookList;

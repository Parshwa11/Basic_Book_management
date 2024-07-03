import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { addBook } from '../../api';

const AddBook = () => {
  const [bookData, setBookData] = useState({ title: '', author: '', genre: '', publishedDate: '', ISBN: '' });
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await addBook(bookData);
      navigate('/');
    } catch (error) {
      console.error(error);
    }
  };

  const handleChange = (e) => {
    setBookData({ ...bookData, [e.target.name]: e.target.value });
  };

  return (
    <div>
      <h1>Add Book</h1>
      <form onSubmit={handleSubmit}>
        <input type="text" name="title" placeholder="Title" onChange={handleChange} required />
        <input type="text" name="author" placeholder="Author" onChange={handleChange} required />
        <input type="text" name="genre" placeholder="Genre" onChange={handleChange} required />
        <input type="date" name="publishedDate" placeholder="Published Date" onChange={handleChange} required />
        <input type="text" name="ISBN" placeholder="ISBN" onChange={handleChange} required />
        <button type="submit">Add Book</button>
      </form>
    </div>
  );
};

export default AddBook;
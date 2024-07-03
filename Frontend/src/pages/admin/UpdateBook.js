import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { fetchBookById, updateBook } from '../../api';

const UpdateBook = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [bookData, setBookData] = useState({ title: '', author: '', genre: '', publishedDate: '', ISBN: '' });

  useEffect(() => {
    const getBook = async () => {
      try {
        const { data } = await fetchBookById(id);
        setBookData(data);
      } catch (error) {
        console.error(error);
      }
    };

    getBook();
  }, [id]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await updateBook(id, bookData);
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
      <h1>Update Book</h1>
      <form onSubmit={handleSubmit}>
        <input type="text" name="title" placeholder="Title" value={bookData.title} onChange={handleChange} required />
        <input type="text" name="author" placeholder="Author" value={bookData.author} onChange={handleChange} required />
        <input type="text" name="genre" placeholder="Genre" value={bookData.genre} onChange={handleChange} required />
        <input type="date" name="publishedDate" placeholder="Published Date" value={bookData.publishedDate} onChange={handleChange} required />
        <input type="text" name="ISBN" placeholder="ISBN" value={bookData.ISBN} onChange={handleChange} required />
        <button type="submit">Update Book</button>
      </form>
    </div>
  );
};

export default UpdateBook;
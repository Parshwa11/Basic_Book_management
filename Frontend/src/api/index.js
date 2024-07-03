import axios from 'axios';

const API = axios.create({ baseURL: 'http://localhost:5000/api/' });

API.interceptors.request.use((req) => {
  if (localStorage.getItem('profile')) {
    req.headers.Authorization = `Bearer ${JSON.parse(localStorage.getItem('profile')).token}`;
  }
  return req;
});

// Auth routes
export const signIn = (formData) => API.post('auth/login', formData);
export const signUp = (formData) => API.post('auth/register', formData);

// Book routes
export const fetchBooks = () => API.get('/books');
export const fetchBookById = (id) => API.get(`/books/${id}`);
export const searchBooks = (query) => API.get(`/books/search?query=${query}`);
export const addBook = (newBook) => API.post('/books/add', newBook);
export const updateBook = (id, updatedBook) => API.put(`/books/update/${id}`, updatedBook);
export const deleteBook = (id) => API.delete(`/books/delete/${id}`);
export const borrowBook = (id) => API.post(`/books/borrow/${id}`);
export const returnBook = (id) => API.post(`/books/return/${id}`);
export const fetchBorrowedBooks = (isAdmin) => {
  const endpoint = isAdmin ? '/books/borrowed/all' : '/books/borrowed';
  return API.get(endpoint);
};
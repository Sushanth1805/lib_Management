import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Header from './components/Header/Header';
import Home from './components/Home/Home';
import Login from './components/Login/Login';
import Register from './components/Register/Register';
import Profile from './components/Profile/Profile';
import Books from './components/Books/Books';
import AddBook from './components/Books/AddBook';
import UpdateProfile from './components/UpdateProfile/UpdateProfile';
import BookDetail from './components/Books/BookDetail';
import Users from './components/Users/Users';
import Book from './components/Books/BookDetailsModal';
const App = () => {
  return (
    <>
      <BrowserRouter>
        <Header />
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/register' element={<Register />} />
          <Route path='/login' element={<Login />} />
          <Route path='/profile' element={<Profile />} />
          <Route path='/books' element={<Books />} />
          <Route path='/bookpreview/:id' element={<Book />} />
          <Route path='/addbook' element={<AddBook />} />
          <Route path='/user-update' element={<UpdateProfile />} />
          <Route path='/book/:id' element={<BookDetail />} />
          <Route path='/users' element={<Users />} />
        </Routes>
      </BrowserRouter>
    </>
  );
};

export default App;

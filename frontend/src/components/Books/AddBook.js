import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { createBook } from '../../redux/actions/books/bookActions';
import { useNavigate } from 'react-router-dom';
import '../CSS/style.css';

const AddBook = () => {
  const [category, setCategory] = useState('');
  const [title, setTitle] = useState('');
  const [author, setAuthor] = useState('');
  const [bookImage, setBookImage] = useState('');
  const [published, setPublishedDate] = useState('');

  const userLogin = useSelector(state => state.userLogin);
  const { userInfo } = userLogin;

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const formSubmitHandler = e => {
    e.preventDefault();
    const data = {
      category,
      title,
      author,
      bookImage,
      published,
      createdBy: userInfo && userInfo._id,
    };
    dispatch(createBook(data));
    navigate('/books');
    window.location.reload();
    
  };

  return (
    <div className='container'>
      <div className='row justify-content-center'>
        <div className='col-lg-6 col-md-8'>
          <h1 className='text-center'>Add Book</h1>
          <form onSubmit={formSubmitHandler}>
            <fieldset>
              <div className='form-group'>
                <label htmlFor='category'>Select Category</label>
                <select
                  id='category'
                  value={category}
                  onChange={e => setCategory(e.target.value)}
                  className='custom-select'
                >
                  <option value='null' default>Select Any Genre</option>
                  <option value='programming'>Programming</option>
                  <option value='religion'>Religion</option>
                  <option value='life'>Life</option>
                  <option value='culture'>Culture</option>
                  <option value='history'>History</option>
                  <option value='science'>Science</option>
                  <option value='fantasy'>Fantasy</option>
                  <option value='romance'>Romance</option>
                  <option value='mystery'>Mystery</option>
                  <option value='education'>Education</option>
                  <option value='self-help'>Self-Help</option>
                  <option value='biography'>Biography</option>
                  <option value='cooking'>Cooking</option>
                  <option value='travel'>Travel</option>
                  <option value='health'>Health</option>
                  <option value='sports'>Sports</option>
                  <option value='technology'>Technology</option>
                </select>
              </div>

              <div className='form-group'>
                <label htmlFor='author'>Author</label>
                <input
                  id='author'
                  value={author}
                  onChange={e => setAuthor(e.target.value)}
                  type='text'
                  className='form-control'
                  placeholder='Author name'
                />
              </div>

              <div className='form-group'>
                <label htmlFor='title'>Title</label>
                <input
                  id='title'
                  value={title}
                  onChange={e => setTitle(e.target.value)}
                  type='text'
                  className='form-control'
                  placeholder='Book title'
                />
              </div>
              <div className='form-group'>
                <label htmlFor='publishedDate'>Published Date</label>
                <input
                  id='publishedDate'
                  value={published}
                  onChange={e => setPublishedDate(e.target.value)}
                  type='date'
                  className='form-control'
                />
              </div>

              <div className='form-group'>
                <label htmlFor='bookImage'>Book Image URL</label>
                <input
                  id='bookImage'
                  value={bookImage}
                  onChange={e => setBookImage(e.target.value)}
                  type='text'
                  className='form-control'
                  placeholder='Enter image URL'
                />
              </div>

              <button type='submit' className='btn btn-success btn-block'>
                Create Book
              </button>
            </fieldset>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AddBook;

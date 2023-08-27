import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { fetchBook, updateBook } from '../../redux/actions/books/bookActions';

const BookDetail = () => {
  const { id } = useParams();

  // Get the book details and fill it in the form
  const bookDetails = useSelector(state => state.bookDetails);
  const { book, loading } = bookDetails;

  const [category, setCategory] = useState('');
  const [title, setTitle] = useState('');
  const [author, setAuthor] = useState('');
  const [bookImage, setBookImage] = useState('');

  useEffect(() => {
    if (!loading && book) {
      setCategory(book.category);
      setTitle(book.title);
      setAuthor(book.author);
      setBookImage(book.bookImage); // Add this line to set the initial value for bookImage
    }
  }, [loading, book]);

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchBook(id));
  }, [dispatch, id]);

  const navigate = useNavigate();

  const formSubmitHandler = e => {
    e.preventDefault();
    const data = {
      category,
      title,
      author,
      bookImage, // Add bookImage to the data object
    };
    dispatch(updateBook(id, data));
    navigate('/books');
    window.location.reload();
  };

  return (
    <div className='row justify-content-center mt-5'>
      <div className='col-lg-6 col-md-8'>
        <div className='container'>
          {book ? (
            <>
              <h1 className='text-center mb-4'>Update Book</h1>
              <form onSubmit={formSubmitHandler}>
                <div className='form-group'>
                  <label htmlFor='category'>Category</label>
                  <select
                    value={category}
                    onChange={e => setCategory(e.target.value)}
                    className='form-control'
                    id='category'
                  >
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
                      {/* Add more options as needed */}
                  </select>
                </div>
                <div className='form-group'>
                  <label htmlFor='author'>Author</label>
                  <input
                    value={author}
                    onChange={e => setAuthor(e.target.value)}
                    type='text'
                    className='form-control'
                    id='author'
                    placeholder='Author name'
                  />
                </div>
                <div className='form-group'>
                  <label htmlFor='title'>Title</label>
                  <input
                    value={title}
                    onChange={e => setTitle(e.target.value)}
                    type='text'
                    className='form-control'
                    id='title'
                    placeholder='Book title'
                  />
                </div>
                <div className='form-group'>
                  <label htmlFor='bookImage'>Book Image URL</label>
                  <input
                    value={bookImage}
                    onChange={e => setBookImage(e.target.value)}
                    type='text'
                    className='form-control'
                    id='bookImage'
                    placeholder='Enter image URL'
                  />
                </div>
                <button type='submit' className='btn btn-success btn-block'>
                  Update Book
                </button>
              </form>
            </>
          ) : (
            'No book data available.'
          )}
        </div>
      </div>
    </div>
  );
};

export default BookDetail;

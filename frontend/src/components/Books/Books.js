import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchBooks, deleteBook } from '../../redux/actions/books/bookActions';
import Loading from '../Loading/Loading';
import BookDetailsModal from './BookDetailsModal'; // Adjust the path accordingly
import { Link} from 'react-router-dom';
import '../../App.css';

const Books = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [selectedBook, setSelectedBook] = useState(null);

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchBooks());
  }, [dispatch]);

  const booksList = useSelector(state => state.booksList);
  const { books, loading } = booksList;

  // const navigate = useNavigate();

  const handleDeleteBook = id => {
    dispatch(deleteBook(id));
    window.location.reload();
    window.location.reload();
    window.location.reload();

  };

  const handleSearch = e => {
    setSearchTerm(e.target.value);
  };

  const handleBookClick = book => {
    setSelectedBook(book);
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setSelectedBook(null);
  };

  if (loading) {
    return <Loading />;
  }

  return (
    <div className='container'>
      <div className='row'>
        <div className='col-lg-10 offset-lg-1'>
          <div className='mb-3 d-flex align-items-center justify-content-between'>
            <Link to='/addbook' className='btn btn-success'>
              Add
            </Link>
            <input
              type='text'
              className='form-control form-control-sm flex-grow-1 ml-2'
              placeholder='Search by book name...'
              value={searchTerm}
              onChange={handleSearch}
            />
          </div>
          <div className='table-responsive'>
            <table className='table table-hover'>
              <thead>
                <tr>
                  <th scope='col'>Book Image</th>
                  <th scope='col'>Book Name</th>
                  <th scope='col'>Author</th>
                  <th scope='col'>Actions</th>
                </tr>
              </thead>
              <tbody>
                {books &&
                  books
                    .filter(book => book.title.toLowerCase().includes(searchTerm.toLowerCase()))
                    .map(book => (
                      <tr className='table-light' key={book._id}>
                        <td>
                          <img src={book.bookImage} alt='Book Cover' style={{ width: '100px' }} />
                        </td>
                        <td>
                          <button className='btn btn-link' onClick={() => handleBookClick(book)}>
                            {book.title}
                          </button>
                        </td>
                        <td>{book.author}</td>
                        <td>
                          <div className='d-flex'>
                            <Link to={`/book/${book._id}`} className='btn btn-warning mr-2'>
                              Edit
                            </Link>
                            <button
                              onClick={() => handleDeleteBook(book._id)}
                              className='btn btn-danger'>
                              Delete
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
      <BookDetailsModal show={showModal} onHide={handleCloseModal} book={selectedBook} />
    </div>
  );
};

export default Books;

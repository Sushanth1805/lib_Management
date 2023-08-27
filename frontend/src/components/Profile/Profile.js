import React, { useEffect, useState } from 'react';
import './Profile.css';
import pic from '../../assets/img/bookpic.jpg';
import { useSelector, useDispatch } from 'react-redux';
import { getUserProfile } from '../../redux/actions/users/userActions';
import { deleteBook, updateBook } from '../../redux/actions/books/bookActions'; // Import the deleteBook and updateBook actions
import Loading from '../Loading/Loading';
import { Link } from 'react-router-dom';

const Profile = ({ history }) => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getUserProfile());
  }, [dispatch, history]);

  // Check if user is logged in; otherwise, redirect
  const userLogin = useSelector(state => state.userLogin);
  const { userInfo } = userLogin;
  useEffect(() => {
    if (userInfo === null) history.push('/login');
  }, [userInfo, history]);

  // Get user Profile
  const userProfile = useSelector(state => state.userProfile);
  const { loading, user } = userProfile;
  const books = userProfile.user && userProfile.user.books;

  // Search functionality
  const [searchTerm, setSearchTerm] = useState('');
  const filteredBooks = books && books.filter(book => book.title.includes(searchTerm));

  // Local state for editing a book
  const [editingBookId, setEditingBookId] = useState(null);
  const [editedBook, setEditedBook] = useState({
    title: '',
    author: '',
  });

  const handleEdit = (bookId) => {
    const bookToEdit = books.find(book => book._id === bookId);
    setEditingBookId(bookId);
    setEditedBook({
      title: bookToEdit.title,
      author: bookToEdit.author,
    });
  };

  const handleCancelEdit = () => {
    setEditingBookId(null);
    setEditedBook({
      title: '',
      author: '',
    });
  };

  const handleUpdate = (bookId) => {
    dispatch(updateBook(bookId, editedBook)); // Dispatch the updateBook action
    setEditingBookId(null);
    window.location.reload(); // Automatically refresh the page after updating
  };

  const handleDelete = async (bookId) => {
    if (window.confirm('Are you sure you want to delete this book?')) {
      await dispatch(deleteBook(bookId)); // Dispatch the deleteBook action
      window.location.reload(); // Automatically refresh the page after deleting
    }
  };

  const renderTable = () => {
    if (filteredBooks && filteredBooks.length > 0) {
      return (
        <table className='table table-hover'>
          <thead>
            <tr>
              <th scope='col'>Book Name</th>
              <th scope='col'>Author</th>
              <th scope='col' className='text-center'>Actions</th> {/* Center-align Actions */}
            </tr>
          </thead>
          <tbody>
            {filteredBooks.map(book => (
              <tr className='table-dark' key={book._id}>
                <td>
                  {editingBookId === book._id ? (
                    <input
                      type='text'
                      value={editedBook.title}
                      onChange={(e) => setEditedBook({ ...editedBook, title: e.target.value })}
                    />
                  ) : book.title}
                </td>
                <td>
                  {editingBookId === book._id ? (
                    <input
                      type='text'
                      value={editedBook.author}
                      onChange={(e) => setEditedBook({ ...editedBook, author: e.target.value })}
                    />
                  ) : book.author}
                </td>
                <td className='text-center'> {/* Center-align Actions */}
                  {editingBookId === book._id ? (
                    <div>
                      <button className='btn btn-success' onClick={() => handleUpdate(book._id)}>
                        Update
                      </button>
                      <button className='btn btn-danger ml-2' onClick={handleCancelEdit}>
                        Cancel
                      </button>
                    </div>
                  ) : (
                    <div>
                      <button className='btn btn-primary' onClick={() => handleEdit(book._id)}>
                        Edit
                      </button>
                      <button className='btn btn-danger ml-2' onClick={() => handleDelete(book._id)}>
                        Delete
                      </button>
                    </div>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      );
    } else {
      return (
        <>
          <h1>You don't have any books created.</h1>
          <Link to='/books'>Start Creating</Link>
        </>
      );
    }
  };

  return (
    <div className='container'>
      <div className='row'>
        <div className='col mt-5'>
          {loading && !user ? (
            <Loading />
          ) : (
            <div className='card m-auto ' style={{ width: '50%' }}>
              <img src={pic} className='card-img-top' alt='...' />
              <div className='card-body'>
                <h5 className='card-title'>{user && user.email}</h5>
                <p className='card-text'>{user && user.name}</p>
                <Link to='/user-update' className='btn btn-primary'>
                  Update your profile
                </Link>
              </div>
            </div>
          )}
        </div>
      </div>

      <br />
      <div className='row'>
        <div className='col'>
          <Link to='/books' className='btn btn-secondary'>
            Add Books
          </Link>
        </div>
        <div className='col text-right'>
          <input
            type='text'
            placeholder='Search Books...'
            value={searchTerm}
            onChange={e => setSearchTerm(e.target.value)}
          />
        </div>
      </div>

      <div className='row'>
        <div className='col'>{renderTable()}</div>
      </div>
    </div>
  );
};

export default Profile;

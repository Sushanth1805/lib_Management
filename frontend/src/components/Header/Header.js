import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { logoutUser } from '../../redux/actions/users/userActions';
import './Header.css';

const Header = () => {
  const dispatch = useDispatch();
  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  const [isNavOpen, setIsNavOpen] = useState(false);

  // Function to close the Navbar
  const closeNavbar = () => {
    setIsNavOpen(false);
  };

  // Logout handler
  const logoutHandler = () => {
    dispatch(logoutUser());
    closeNavbar();
    window.location.href = '/';
  };

  return (
    <header>
      <nav className='navbar navbar-expand-lg navbar-expand-md navbar-expand-sm navbar-dark bg-dark'>
        <Link className='navbar-brand' to='/' onClick={closeNavbar}>
          Book store
        </Link>
        <button
          className='navbar-toggler'
          type='button'
          onClick={() => setIsNavOpen(!isNavOpen)}>
          <span className='navbar-toggler-icon'></span>
        </button>

        <div className={`collapse navbar-collapse${isNavOpen ? ' show' : ''}`} id='navbarColor01'>
          <ul className='navbar-nav ml-auto'>
            <li className='nav-item active'>
              <Link className='nav-link' to='/' onClick={closeNavbar}>
                Home <span className='sr-only'>(current)</span>
              </Link>
            </li>
            {userInfo ? (
              <>
                <li className='nav-item'>
                  <Link className='nav-link' to='/books' onClick={closeNavbar}>
                    Books
                  </Link>
                </li>
                <li className='nav-item'>
                  <Link className='nav-link' to='/users' onClick={closeNavbar}>
                    Users
                  </Link>
                </li>
                <li className='nav-item dropdown'>
                  <Link
                    className='nav-link dropdown-toggle'
                    to='/'
                    role='button'
                    data-toggle='dropdown'
                    aria-haspopup='true'
                    aria-expanded='false'
                    onClick={closeNavbar}>
                    {userInfo.name}
                  </Link>
                  <div className='dropdown-menu'>
                    <Link className='dropdown-item' to='/profile' onClick={closeNavbar}>
                      Profile
                    </Link>
                    <Link className='dropdown-item' to='/addbook' onClick={closeNavbar}>
                      Add book
                    </Link>
                    <Link className='dropdown-item' to='/books' onClick={closeNavbar}>
                      Books
                    </Link>
                    <div className='dropdown-divider'></div>
                    <button onClick={logoutHandler} className='dropdown-item text-danger'>
                      Logout
                    </button>
                  </div>
                </li>
              </>
            ) : (
              <>
                <li className='nav-item'>
                  <Link className='nav-link' to='/login' onClick={closeNavbar}>
                    Login
                  </Link>
                </li>
                <li className='nav-item'>
                  <Link className='nav-link' to='/register' onClick={closeNavbar}>
                    Register
                  </Link>
                </li>
              </>
            )}
          </ul>
        </div>
      </nav>
    </header>
  );
};

export default Header;

import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { loginUser } from '../../redux/actions/users/userActions';
import ErrorMessage from '../DisplayMessage/ErrorMessage';
import Loading from '../Loading/Loading';
import { Link, useNavigate } from 'react-router-dom';
import './Login.css'; // Import your custom CSS file for additional styling

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const userLoginDetails = useSelector((state) => state.userLogin);
  const { loading, userInfo, error } = userLoginDetails;

  useEffect(() => {
    if (userInfo) {
      navigate('/');
    }
  }, [userInfo, navigate]);

  const submitFormHandler = (e) => {
    e.preventDefault();
    dispatch(loginUser(email, password));
  };

  return (
    <div className='container'>
      <div className='row justify-content-center'>
        <div className='col-md-6 col-lg-4'>
          <div className='card login-card'>
            <div className='card-header login-header'>
              <h1>Login</h1>
            </div>
            <div className='card-body'>
              <form onSubmit={submitFormHandler}>
                <div className='mb-3'>
                  <label htmlFor='exampleInputEmail1' className='form-label'>
                    Email address
                  </label>
                  <input
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    type='email'
                    className='form-control'
                    id='exampleInputEmail1'
                    placeholder='Enter email'
                  />
                </div>
                <div className='mb-3'>
                  <label htmlFor='exampleInputPassword1' className='form-label'>
                    Password
                  </label>
                  <input
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    type='password'
                    className='form-control'
                    id='exampleInputPassword1'
                    placeholder='Password'
                  />
                </div>
                <button type='submit' className='btn btn-info btn-block'>
                  Login
                </button>
              </form>
              {loading && <Loading />}
              {error && <ErrorMessage error={error} />}
              <div className='register-link mt-3 text-center'>
                Don't have an account? <Link to='/register'>Register here</Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
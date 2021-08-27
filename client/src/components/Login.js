import React, { useState, useRef, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import {
  mouseOverHandler,
  mouseOutHandler,
  btnActive,
} from '../utils/InputValidation';
import { inputEvent, passwordEvent } from '../utils/windowEventHandler';
import { loginUser } from '../redux/actions/authActions';
import Loader from './Loader';

const Login = () => {
  const dispatch = useDispatch();
  const history = useHistory();

  const [userEmail, setUserEmail] = useState('');
  const [userPass, setUserPass] = useState('');

  const logInRef = useRef(null);

  btnActive(userEmail, userPass, logInRef);

  const { isAuthenticated, loading } = useSelector(
    (state) => state.currentUser
  );

  const ERROR = useSelector((state) => state.getErrors);

  const logInHandler = () => {
    const data = {
      email: userEmail,
      password: userPass,
    };
    dispatch(loginUser(data, history));
  };

  const signUpLinkHandler = () => {
    history.push('/signup');
  };

  useEffect(() => {
    inputEvent();
    passwordEvent();

    if (isAuthenticated) {
      history.push('/home');
      setUserEmail('');
      setUserPass('');
    }
  }, []);

  return (
    <div>
      {loading ? (
        <Loader />
      ) : (
        <div className='SignUpLoginContainer'>
          <div className='SignUpLogin'>
            <h3>Log in to Twitter Clone</h3>
            <form onSubmit={(e) => e.preventDefault()}>
              <div>
                <div
                  className='LoginInput'
                  style={ERROR.email && { marginBottom: '0px' }}
                >
                  <span>Email</span>
                  <input
                    type='hidden'
                    name='username'
                    value={userEmail}
                    onChange={(e) => setUserEmail(e.target.value)}
                  />
                </div>
                {ERROR.email && (
                  <small
                    className='LoginError'
                    style={ERROR.email && { marginBottom: '15px' }}
                  >
                    {ERROR.email}
                  </small>
                )}
              </div>

              <div>
                <div className='PasswordInput'>
                  <span>Password</span>
                  <input
                    type='hidden'
                    name='username'
                    value={userPass}
                    onChange={(e) => setUserPass(e.target.value)}
                  />
                </div>
                {ERROR.password && (
                  <small className='LoginError'>{ERROR.password}</small>
                )}
              </div>
              <button
                onClick={logInHandler}
                ref={logInRef}
                onMouseOver={() =>
                  mouseOverHandler(userEmail, userPass, logInRef)
                }
                onMouseOut={() =>
                  mouseOutHandler(userEmail, userPass, logInRef)
                }
              >
                Log in
              </button>
            </form>

            <span className='SignUpLink' onClick={signUpLinkHandler}>
              Sign up for Twitter Clone
            </span>
          </div>
        </div>
      )}
    </div>
  );
};

export default Login;

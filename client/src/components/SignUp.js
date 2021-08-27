import React, { useState, useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useHistory } from 'react-router-dom';
import { registerUser, checkEmailExist } from '../redux/actions/authActions';
import moment from 'moment';
import { validateEmail } from '../utils/emailValidation';
import {
  validateSignupInput,
  changeBorder,
  changeBorder2,
} from '../utils/InputValidation';
import { daysInMonth, yearsList } from '../utils/daysInMonth';
import SelectInputContainer from './SelectInputComponent';

const SignUp = () => {
  const dispatch = useDispatch();
  const history = useHistory();

  const [years, setYears] = useState([]);
  const [months] = useState(['', ...moment.months()]);
  const [birthMonth, setBirthMonth] = useState('');
  const [birthday, setBirthday] = useState('');
  const [birthYear, setBirthYear] = useState('');
  const [userName, setUserName] = useState('');
  const [userEmail, setUserEmail] = useState('');
  const [userPassword, setUserPassword] = useState('');
  const [userAbout, setUserAbout] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [inputNameError, setInputNameError] = useState(false);
  const [inputEmailError, setInputEmailError] = useState(false);
  const [inputPassError, setInputPassError] = useState(false);
  const [signup1, setSignup1] = useState(true);
  const [signup2, setSignup2] = useState(false);
  const [errorMsg, setErrorMsg] = useState();

  const inputTextRef = useRef(null);
  const inputEmailRef = useRef(null);
  const nextBtnRef = useRef(null);
  const monthContainerRef = useRef(null);
  const dayContainerRef = useRef(null);
  const yearContainerRef = useRef(null);
  const showPassRef = useRef(null);

  const birth = [];
  birth.push(birthMonth.slice(0, 3), `${birthday},`, birthYear);

  const ERROR = useSelector((state) => state.getErrors);

  const nextSignUpPageHandler = (e) => {
    setSignup1(false);
    setSignup2(true);
  };

  const signUpBackHandler = (e) => {
    setSignup1(true);
    setSignup2(false);

    setTimeout(() => {
      validateSignupInput(
        userName,
        userEmail,
        birthMonth,
        birthYear,
        birthday,
        userPassword,
        confirmPassword,
        nextBtnRef
      );
    }, 1000);
  };

  //   console.log(months.indexOf('January'));

  // get days in a month
  let monthLength = daysInMonth(months.slice(1).indexOf(birthMonth) + 1, 2012);
  const daysOfMonth = [''];
  for (let i = 1; i <= monthLength; i++) {
    daysOfMonth.push(i);
  }

  const inputTextActive = (e) => {
    if (e.target.value !== '') {
      inputTextRef.current.style.borderColor = '#1da1f2';
    }
  };

  const inputNameHandler = (e) => {
    if (e.target.value !== '') {
      setInputNameError(false);
      inputTextRef.current.style.borderColor = '#1da1f2';
    }
    setUserName(e.target.value);
  };

  const showError = (e) => {
    if (e.target.value === '') {
      setInputNameError(true);
      inputTextRef.current.style.borderColor = '#e75582';
    }

    if (e.target.value !== '') {
      inputTextRef.current.style.borderColor = '#c4cfd6';
    }
  };

  const inputEmailHandler = (e) => {
    if (!validateEmail(e.target.value)) {
      setInputEmailError(true);
      setErrorMsg('Please enter a valid email.');
      inputEmailRef.current.style.borderColor = '#e75582';
    }
    if (validateEmail(e.target.value)) {
      setInputEmailError(false);
      setErrorMsg('');
      inputEmailRef.current.style.borderColor = '#1da1f2';
    }

    if (e.target.value === '') {
      setInputEmailError(false);
      inputEmailRef.current.style.borderColor = '#1da1f2';
    }

    setUserEmail(e.target.value);
  };

  const inputEmailActive = (e) => {
    if (e.target.value === '') {
      setInputEmailError(false);
      inputEmailRef.current.style.borderColor = '#1da1f2';
    }

    if (ERROR.email && e.target.value !== '') {
      inputEmailRef.current.style.borderColor = '#e75582';
    }

    if (e.target.value !== '') {
      setInputEmailError(false);
      inputEmailRef.current.style.borderColor = '#1da1f2';
    }
  };

  const showEmailError = (e) => {
    if (e.target.value === '') {
      setInputEmailError(false);
      inputEmailRef.current.style.borderColor = '#c4cfd6';
    }

    if (!validateEmail(e.target.value) && e.target.value !== '') {
      inputEmailRef.current.style.borderColor = '#e75582';
    }

    if (validateEmail(e.target.value) && e.target.value !== '') {
      inputEmailRef.current.style.borderColor = '#c4cfd6';
    }

    dispatch(checkEmailExist({ email: userEmail }));
  };

  const closeSignUp = () => {
    history.push('/');
  };

  const signUpHandler = () => {
    const data = {
      name: userName,
      email: userEmail,
      about: userAbout,
      password: userPassword,
      confirmPass: confirmPassword,
      dateOfBirth: `${birthMonth} ${birthday} ${birthYear}`,
    };
    dispatch(registerUser(data, history));
  };

  const loginLinkHandler = () => {
    history.push('/login');
  };

  if (userPassword !== confirmPassword) {
    const passInput = document.querySelectorAll('.PasswordInput');

    if (passInput !== null) {
      passInput.forEach((pass) => {
        pass.style.borderColor = '#e75582';
      });
    }
  } else {
    const passInput = document.querySelectorAll('.PasswordInput');
    const elem = document.activeElement;
    if (passInput !== null) {
      passInput.forEach((pass) => {
        if (pass === elem) {
          pass.style.borderColor = '#1da1f2';
        } else {
          pass.style.borderColor = '#c4cfd6';
        }
      });
    }
  }

  const showPassword = (e) => {
    if (e.target.textContent === 'visibility_off') {
      e.target.textContent = 'visibility';
      showPassRef.current.type = 'text';
    } else {
      e.target.textContent = 'visibility_off';
      showPassRef.current.type = 'password';
    }
  };

  const confirmPasswordHandler = (e) => {
    setConfirmPassword(e.target.value);

    if (e.target.value !== userPassword) {
      setInputPassError(true);
    }

    if (e.target.value === userPassword) {
      setInputPassError(false);
    }
  };

  validateSignupInput(
    userName,
    userEmail,
    birthMonth,
    birthYear,
    birthday,
    userPassword,
    confirmPassword,
    nextBtnRef
  );

  useEffect(() => {
    setYears(yearsList());
  }, []);

  return (
    <div className='SignUpContainer'>
      {signup1 && (
        <div>
          <div className='nextBtn' ref={nextBtnRef}>
            <i className='material-icons' onClick={closeSignUp} title='Close'>
              clear
            </i>
            <button onClick={nextSignUpPageHandler}>Next</button>
          </div>
          <div className='SignUpInputGroupContainer'>
            <h3>Create your account</h3>
            <div className='SignUpInputGroup'>
              <div className='InputName'>
                <input
                  className='NameInput'
                  ref={inputTextRef}
                  style={
                    inputNameError
                      ? { marginBottom: '0px' }
                      : { marginBottom: '30px' }
                  }
                  type='text'
                  placeholder='Name'
                  value={userName}
                  onChange={inputNameHandler}
                  onBlur={showError}
                  onFocus={inputTextActive}
                />
                {inputNameError && <small>What’s your name?</small>}
              </div>

              <div className='InputEmail'>
                <input
                  className='EmailInput'
                  type='email'
                  placeholder='Email'
                  style={
                    inputEmailError
                      ? { marginBottom: '0px' }
                      : ERROR.email
                      ? { marginBottom: '0px', border: '1px solid #e75582' }
                      : { marginBottom: '30px' }
                  }
                  value={userEmail}
                  ref={inputEmailRef}
                  onChange={inputEmailHandler}
                  onFocus={inputEmailActive}
                  onBlur={showEmailError}
                />
                {inputEmailError ? (
                  <small>{errorMsg}</small>
                ) : ERROR.email ? (
                  <small>{ERROR.email}</small>
                ) : (
                  ''
                )}
              </div>

              <div className='InputTextArea'>
                <textarea
                  className='TextAreaInput'
                  cols='30'
                  rows='7'
                  placeholder='Tell us about yourself...'
                  value={userAbout}
                  onChange={(e) => setUserAbout(e.target.value)}
                ></textarea>
              </div>

              <div className='InputPassword'>
                <input
                  className='PasswordInput'
                  type='password'
                  name='password'
                  placeholder='Password'
                  value={userPassword}
                  onChange={(e) => setUserPassword(e.target.value)}
                  onFocus={(e) => (e.target.style.borderColor = '#1da1f2')}
                  onBlur={(e) => (e.target.style.borderColor = '#c4cfd6')}
                />
              </div>

              <div className='InputPassword'>
                <input
                  className='PasswordInput'
                  type='password'
                  placeholder='Confirm Password'
                  value={confirmPassword}
                  onChange={confirmPasswordHandler}
                  onFocus={(e) => (e.target.style.borderColor = '#1da1f2')}
                  onBlur={(e) => (e.target.style.borderColor = '#c4cfd6')}
                />
                {inputPassError && <small>Password must match.</small>}
              </div>
            </div>

            <h4>Date of birth</h4>
            <p>
              This will not be shown publicly. Confirm your own age, even if
              this account is for a business, a pet, or something else.
            </p>

            <div className='SelectInputContainer'>
              <SelectInputContainer
                containerRef={monthContainerRef}
                birthDate={birthMonth}
                setDate={setBirthMonth}
                changeBorder={changeBorder}
                changeBorder2={changeBorder2}
                OptionArr={months}
                smallText='Month'
                classname='MonthContainer'
              />

              <SelectInputContainer
                containerRef={dayContainerRef}
                birthDate={birthday}
                setDate={setBirthday}
                changeBorder={changeBorder}
                changeBorder2={changeBorder2}
                OptionArr={daysOfMonth}
                smallText='Day'
                classname='DayContainer'
              />

              <SelectInputContainer
                containerRef={yearContainerRef}
                birthDate={birthYear}
                setDate={setBirthYear}
                changeBorder={changeBorder}
                changeBorder2={changeBorder2}
                OptionArr={years}
                smallText='Year'
                classname='YearContainer'
              />
            </div>

            <span onClick={loginLinkHandler}>
              Already have an account? Log in
            </span>
          </div>
        </div>
      )}

      {signup2 && (
        <div>
          <div className='ClearContainer'>
            <i
              className='material-icons'
              onClick={signUpBackHandler}
              title='Go back'
            >
              trending_flat
            </i>

            <h3>Step 2 of 2</h3>
          </div>

          <div className='SignUpDetailsContainer'>
            <h3>Create your account</h3>
            <div>
              <div
                className='SignUpDetails'
                style={
                  ERROR.name
                    ? { marginBottom: '5px' }
                    : { marginBottom: '25px' }
                }
              >
                <small>Name</small>
                <p>{userName}</p>
              </div>
              {ERROR.name ? (
                <small className='SignUpError'>{ERROR.name}</small>
              ) : (
                ''
              )}
            </div>

            <div>
              <div
                className='SignUpDetails'
                style={
                  ERROR.email
                    ? { marginBottom: '5px' }
                    : { marginBottom: '25px' }
                }
              >
                <small>Email</small>
                <p>{userEmail}</p>
              </div>
              {ERROR.email ? (
                <small className='SignUpError'>{ERROR.email}</small>
              ) : (
                ''
              )}
            </div>

            {userAbout !== '' && (
              <div>
                <div className='SignUpDetails'>
                  <small>About</small>
                  <p>{userAbout}</p>
                </div>
              </div>
            )}

            <div>
              <div
                className='SignUpDetails SignUpDetailsPass'
                style={
                  ERROR.password
                    ? { marginBottom: '5px' }
                    : { marginBottom: '25px' }
                }
              >
                <div>
                  <small>Password</small>
                  <input
                    type='password'
                    defaultValue={userPassword}
                    ref={showPassRef}
                  />
                </div>
                <i className='material-icons' onClick={showPassword}>
                  visibility_off
                </i>
              </div>
              {ERROR.password ? (
                <small className='SignUpError'>{ERROR.password}</small>
              ) : (
                ''
              )}
            </div>

            <div className='SignUpDetails'>
              <small>Birth date</small>
              <p>{birth.join(' ')}</p>
            </div>

            <div className='PrivacyPolicy'>
              <p>
                By signing up, you agree to the{' '}
                <Link to='#'>Terms of Service</Link> and{' '}
                <Link to='#'>Privacy Policy</Link>, including{' '}
                <Link to='#'>Cookie Use</Link>. Others will be able to find you
                by email or phone number when provided ·{' '}
                <Link to='#'>Privacy Options</Link>
              </p>
            </div>

            <button
              style={ERROR.email && { pointerEvents: 'none' }}
              onClick={signUpHandler}
            >
              Sign up
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default SignUp;

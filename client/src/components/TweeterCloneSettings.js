import React, { useEffect, useState, useRef } from 'react';
import { useHistory } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import moment from 'moment';
import bcrypt from 'bcryptjs';
import noPhoto from '../images/noProfilePhoto.png';
import Loader from './Loader';
import { daysInMonth, yearsList } from '../utils/daysInMonth';
import { updateUser } from '../redux/actions/updateUserAction';
import { logoutUser } from '../redux/actions/authActions';
import '../css/TweeterCloneSettings.css';

const TweeterCloneSettings = () => {
  const history = useHistory();
  const dispatch = useDispatch();

  const { user } = useSelector((state) => state.currentUser);
  const { success, passUpdated, loading } = useSelector(
    (state) => state.updateUser
  );
  const errors = useSelector((state) => state.getErrors);

  const [years, setYears] = useState([]);
  const [months] = useState(['', ...moment.months()]);
  const [username, setUsername] = useState(user.name);
  const [userEmail, setUserEmail] = useState(user.email);
  const [userAbout, setUserAbout] = useState(user.about);
  const [changePassword, setChangePassword] = useState('');
  //   const [confirmPassword, setConfirmPassword] = useState('');
  const [birthMonth, setBirthMonth] = useState(user ? user.birthMonth : '');
  const [birthday, setBirthday] = useState(user ? user.birthDay : '');
  const [birthYear, setBirthYear] = useState(user ? user.birthYear : '');
  const [imgFile, setImgFile] = useState('');
  const [coverImgFile, setCoverImgFile] = useState('');
  const [showPic, setShowPic] = useState(user.userImage);
  const [showCoverPic, setShowCoverPic] = useState(user.coverPhoto);
  const [passMatch, setPassMatch] = useState(false);
  const [passMatch2, setPassMatch2] = useState(false);

  const changePassRef = useRef(null);
  const confirmPassRef = useRef(null);
  const confirmBtnRef = useRef(null);

  // get days in a month
  let monthLength = daysInMonth(months.slice(1).indexOf(birthMonth) + 1, 2012);
  const daysOfMonth = [];
  for (let i = 1; i <= monthLength; i++) {
    daysOfMonth.push(i);
  }

  const checkPasswordHandler = (e) => {
    bcrypt.compare(e.target.value, user.password).then((isMatch) => {
      if (isMatch) {
        setPassMatch(isMatch);
      } else {
        setPassMatch(false);
      }
    });
  };

  const passMatchHandler = (e) => {
    if (changePassword !== e.target.value) {
      setPassMatch2(true);
    } else if (changePassword === e.target.value) {
      setPassMatch2(false);
    }
  };

  const inputFileHandler = (e) => {
    let reader = new FileReader();
    if (e.target.name === 'add-photo') {
      reader.readAsDataURL(e.target.files[0]);
      reader.onloadend = function () {
        setShowPic(reader.result);
      };
      setImgFile(e.target.files[0]);
    } else if (e.target.name === 'cover-photo') {
      reader.readAsDataURL(e.target.files[0]);
      reader.onloadend = function () {
        setShowCoverPic(reader.result);
      };
      setCoverImgFile(e.target.files[0]);
    }
  };

  const updateSettingsHandler = (e) => {
    let formData = new FormData();
    formData.append('name', username);
    formData.append('email', userEmail);
    formData.append('about', userAbout);
    formData.append('password', changePassword);
    formData.append('dateOfBirth', `${birthMonth} ${birthday} ${birthYear}`);
    formData.append('userImage', imgFile);
    formData.append('coverPhoto', coverImgFile);
    formData.append('userID', user.id);

    if (changePassword !== '') {
      if (
        window.confirm(
          'You wil need to sign in again to continue! Are you sure? '
        )
      ) {
        dispatch(updateUser(formData));
      }
    } else {
      dispatch(updateUser(formData));
    }
  };

  if (changePassRef.current !== null && confirmPassRef.current !== null) {
    if (passMatch || passMatch2) {
      confirmBtnRef.current.style.pointerEvents = 'none';
      confirmBtnRef.current.style.background = '#b1aeae';
    } else {
      confirmBtnRef.current.style.pointerEvents = 'unset';
      confirmBtnRef.current.style.background = '#1a91da';
    }
  }

  if (success && passUpdated) {
    dispatch(logoutUser());
    history.push('/login');
    window.location.reload();
  } else if (success) {
    history.push('/home');
    window.location.reload();
  }

  useEffect(() => {
    setYears(yearsList());
  }, []);

  return (
    <div className='TweeterCloneSettingsContainer'>
      {loading ? (
        <Loader />
      ) : (
        <div>
          <div className='BackContainer' onClick={() => history.push('/home')}>
            <i className='material-icons'>arrow_right_alt</i>
            <p>back</p>
          </div>
          <div className='TweeterCloneSettings'>
            <h2>Update Settings</h2>
            <form onSubmit={(e) => e.preventDefault()}>
              <div className='InputSettingsGroupContainer'>
                <div className='InputSettingsGroup'>
                  <small>Change name</small>
                  <input
                    type='text'
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                  />
                </div>
                <div className='InputSettingsGroup'>
                  <small>Change email</small>
                  <input
                    type='email'
                    value={userEmail}
                    onChange={(e) => setUserEmail(e.target.value)}
                  />
                </div>

                <div className='InputSettingsGroup'>
                  <small>Update about</small>
                  <textarea
                    cols='30'
                    rows='5'
                    value={userAbout}
                    onChange={(e) => setUserAbout(e.target.value)}
                  ></textarea>
                </div>

                <div>
                  <div
                    className='InputSettingsGroup'
                    style={
                      passMatch || errors.password
                        ? { marginBottom: '0px' }
                        : { marginBottom: '20px' }
                    }
                  >
                    <small>Change Password</small>
                    <input
                      type='password'
                      name='changePass'
                      onChange={(e) => setChangePassword(e.target.value)}
                      onBlur={checkPasswordHandler}
                      ref={changePassRef}
                    />
                  </div>
                  {
                    <small className='passError'>
                      {passMatch
                        ? 'Password must be new'
                        : errors.password
                        ? errors.password
                        : ''}
                    </small>
                  }
                </div>

                <div>
                  <div
                    className='InputSettingsGroup'
                    style={
                      passMatch2
                        ? { marginBottom: '0px' }
                        : { marginBottom: '20px' }
                    }
                  >
                    <small>Confirm Password </small>
                    <input
                      type='password'
                      //   onChange={(e) => setConfirmPassword(e.target.value)}
                      onBlur={passMatchHandler}
                      ref={confirmPassRef}
                    />
                  </div>
                  {passMatch2 && (
                    <small className='passError'>
                      Password must be identical
                    </small>
                  )}
                </div>
              </div>
              <div className='BirthdateSelectContainer'>
                <select
                  name='month'
                  value={birthMonth}
                  onChange={(e) => setBirthMonth(e.target.value)}
                >
                  {months.slice(1).map((mnths, i) => (
                    <option key={i} value={mnths}>
                      {mnths}
                    </option>
                  ))}
                </select>

                <select
                  name='day'
                  value={birthday}
                  onChange={(e) => setBirthday(e.target.value)}
                >
                  {daysOfMonth.map((days, i) => (
                    <option key={i} value={days}>
                      {days}
                    </option>
                  ))}
                </select>

                <select
                  name='year'
                  value={birthYear}
                  onChange={(e) => setBirthYear(e.target.value)}
                >
                  {years.slice(1).map((yrs, i) => (
                    <option key={i} value={yrs}>
                      {yrs}
                    </option>
                  ))}
                </select>
              </div>

              <div className='AddImageContainer'>
                <div
                  className='PhotoContainer'
                  style={{
                    backgroundImage: `url(${showPic ? showPic : noPhoto})`,
                  }}
                ></div>
                <label className='InputFileUpload'>
                  <input
                    type='file'
                    name='add-photo'
                    onChange={inputFileHandler}
                  />
                  Add Image
                </label>
              </div>

              <div className='AddImageContainer'>
                <div
                  className='PhotoContainer'
                  style={{
                    backgroundImage: `url(${
                      showCoverPic ? showCoverPic : noPhoto
                    })`,
                  }}
                ></div>
                <label className='InputFileUpload'>
                  <input
                    type='file'
                    name='cover-photo'
                    onChange={inputFileHandler}
                  />
                  Add or update cover photo
                </label>
              </div>

              <div
                style={
                  passMatch || passMatch2
                    ? { cursor: 'not-allowed' }
                    : { cursor: '' }
                }
              >
                <button
                  className='confirmBtn'
                  onClick={updateSettingsHandler}
                  ref={confirmBtnRef}
                >
                  Confirm Settings
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default TweeterCloneSettings;

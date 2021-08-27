import {
  GET_ERRORS,
  CLEAR_ERRORS,
  SET_CURRENT_USER,
  GET_CURRENT_USER,
  RESET_STATE,
} from '../constants';
import { setAuthToken } from '../../utils/setAuthToken';
import jwt_decode from 'jwt-decode';
import axios from 'axios';

//check email exists
export const checkEmailExist = (data) => (dispatch) => {
  dispatch(clearErrors());

  axios
    .post('/api/users/check-email', data)
    .then()
    .catch((err) =>
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data,
      })
    );
};

//register user
export const registerUser = (data, history) => (dispatch) => {
  dispatch(clearErrors());

  axios
    .post('/api/users/register', data)
    .then(() => {
      history.push('/login');
    })
    .catch((err) =>
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data,
      })
    );
};

//login to get user token
export const loginUser = (data, history) => (dispatch) => {
  dispatch(clearErrors());
  dispatch({ type: GET_CURRENT_USER });

  axios
    .post('/api/users/login', data)
    .then((res) => {
      //save token to local storage
      const { token } = res.data;
      localStorage.setItem('jwtToken', token);

      //set authToken to authHeader
      setAuthToken(token);

      //decode token to get user data
      const decoded = jwt_decode(token);

      //set current user
      dispatch(setCurrentUser(decoded));
      history.push('/home');
      // setTimeout(() => {
      // }, 1000);
    })
    .catch((err) => {
      dispatch({
        type: RESET_STATE,
      });
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data,
      });
    });
};

//set logged in user
export const setCurrentUser = (decoded) => {
  return {
    type: SET_CURRENT_USER,
    payload: decoded,
  };
};

//log out user
export const logoutUser = () => (dispatch) => {
  //remove token from local storage
  localStorage.removeItem('jwtToken');

  //remove authHeader for future request
  setAuthToken(false);

  //set current user to {} which will set isAuthenticated to false
  dispatch(setCurrentUser({}));
};

// clear errors
export const clearErrors = () => {
  return {
    type: CLEAR_ERRORS,
  };
};

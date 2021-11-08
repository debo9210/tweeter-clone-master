import {
  GET_ALL_USERS_REQUEST,
  GET_ALL_USERS_SUCCESS,
  GET_CURRENT_USER,
  GET_ERRORS,
  GET_USER_REQUEST,
  GET_USER_SUCCESS,
} from '../constants';
import { clearErrors, setCurrentUser } from './authActions';
import { setAuthToken } from '../../utils/setAuthToken';
import jwt_decode from 'jwt-decode';
import axios from 'axios';

export const getUser = (name) => async (dispatch) => {
  try {
    dispatch(clearErrors());
    dispatch({ type: GET_USER_REQUEST });

    const { data } = await axios.get(`api/users/get-user/${name}`);

    dispatch({
      type: GET_USER_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: GET_ERRORS,
      payload: error.response.data,
    });
  }
};

export const getCurrentUser = (name) => async (dispatch) => {
  try {
    dispatch(clearErrors());
    dispatch({ type: GET_CURRENT_USER });

    const { data } = await axios.get(`api/users/current/${name}`);

    // save token to local storage
    const { token } = data;
    localStorage.setItem('jwtToken', token);

    // set authToken to authHeader
    setAuthToken(token);

    // decode token to get user data
    const decoded = jwt_decode(token);

    // set current user
    dispatch(setCurrentUser(decoded));
  } catch (error) {
    dispatch({
      type: GET_ERRORS,
      payload: error.response.data,
    });
  }
};

export const getAllUsers = () => async (dispatch) => {
  try {
    dispatch(clearErrors());
    dispatch({ type: GET_ALL_USERS_REQUEST });

    const { data } = await axios.get(`api/users/getAllUsers`);
    dispatch({
      type: GET_ALL_USERS_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: GET_ERRORS,
      payload: error.response.data,
    });
  }
};

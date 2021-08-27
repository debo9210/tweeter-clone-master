import {
  GET_ALL_USERS_REQUEST,
  GET_ALL_USERS_SUCCESS,
  GET_ERRORS,
  GET_USER_REQUEST,
  GET_USER_SUCCESS,
} from '../constants';
import { clearErrors } from './authActions';
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

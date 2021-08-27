import {
  ADD_COVER_PHOTO_REQUEST,
  ADD_COVER_PHOTO_SUCCESS,
  GET_ERRORS,
  UPDATE_USER_REQUEST,
  UPDATE_USER_SUCCESS,
} from '../constants';
import { clearErrors, setCurrentUser } from './authActions';
import { setAuthToken } from '../../utils/setAuthToken';
import axios from 'axios';
import jwt_decode from 'jwt-decode';

export const updateUser = (data) => (dispatch) => {
  dispatch(clearErrors());

  dispatch({
    type: UPDATE_USER_REQUEST,
  });

  axios
    .put('/api/users/update-user', data, {
      header: {
        'Content-Type': 'multipart/form-data',
      },
    })
    .then((res) => {
      const { token, success, passwordUpdated } = res.data;

      localStorage.setItem('jwtToken', token);

      setAuthToken(token);

      dispatch(setCurrentUser(jwt_decode(token)));

      dispatch({
        type: UPDATE_USER_SUCCESS,
        payload: success,
        payload2: passwordUpdated,
      });
    })
    .catch((err) =>
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data,
      })
    );
};

export const addCoverPhoto = (data) => (dispatch) => {
  dispatch(clearErrors());

  dispatch({ type: ADD_COVER_PHOTO_REQUEST });

  axios
    .put('/api/users/add-cover-photo', data, {
      header: {
        'Content-Type': 'multipart/form-data',
      },
    })
    .then((res) => {
      const { token, success, msg } = res.data;

      localStorage.setItem('jwtToken', token);

      setAuthToken(token);

      dispatch(setCurrentUser(jwt_decode(token)));

      dispatch({
        type: ADD_COVER_PHOTO_SUCCESS,
        payload: success,
        payload2: msg,
      });
    })
    .catch((err) =>
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data,
      })
    );
};

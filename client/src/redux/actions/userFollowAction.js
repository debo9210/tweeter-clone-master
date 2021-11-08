import axios from 'axios';
import store from '../../store';
import jwt_decode from 'jwt-decode';
import { setAuthToken } from '../../utils/setAuthToken';
import { setCurrentUser } from './authActions';
import { GET_ALL_USERS_SUCCESS } from '../constants';

export const followUser = (name, id, action) => {
  axios
    .post(`/api/follow/${name}/${id}/${action}`)
    .then((res) => {
      const { token, allUsers } = res.data;
      localStorage.setItem('jwtToken', token);

      setAuthToken(token);

      const decoded = jwt_decode(token);

      store.dispatch(setCurrentUser(decoded));

      // console.log(decoded);

      store.dispatch({
        type: GET_ALL_USERS_SUCCESS,
        payload: allUsers,
      });
    })
    .catch((err) => console.log(err));
};

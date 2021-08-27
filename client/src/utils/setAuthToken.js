import axios from 'axios';

export const setAuthToken = (token) => {
  if (token) {
    //apply token to every request
    axios.defaults.headers.common.Authorization = token;
  } else {
    // delete auth headers
    delete axios.defaults.headers.common.Authorization;
  }
};

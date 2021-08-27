import axios from 'axios';

export const followUser = (name, id, action) => {
  axios.post(`/api/follow/${name}/${id}/${action}`);
};

import { GET_ERRORS, CLEAR_ERRORS } from '../constants';

export const errorReducer = (state = {}, action) => {
  switch (action.type) {
    case GET_ERRORS:
      return action.payload;
    case CLEAR_ERRORS:
      return {};
    default:
      return state;
  }
};

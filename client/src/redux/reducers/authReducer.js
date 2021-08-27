import { GET_CURRENT_USER, RESET_STATE, SET_CURRENT_USER } from '../constants';
import { isEmpty } from '../../utils/isEmpty';

const initialState = {
  isAuthenticated: false,
  user: {},
  loading: false,
};

export const currentUserReducer = (state = initialState, action) => {
  switch (action.type) {
    case RESET_STATE:
      return { ...state, loading: false };
    case GET_CURRENT_USER:
      return {
        ...state,
        loading: true,
      };
    case SET_CURRENT_USER:
      return {
        ...state,
        isAuthenticated: !isEmpty(action.payload),
        user: action.payload,
        loading: false,
      };
    default:
      return state;
  }
};

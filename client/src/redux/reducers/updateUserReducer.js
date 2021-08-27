import {
  ADD_COVER_PHOTO_REQUEST,
  ADD_COVER_PHOTO_SUCCESS,
  UPDATE_USER_REQUEST,
  UPDATE_USER_SUCCESS,
} from '../constants';

export const updateUserReducer = (state = { success: false }, action) => {
  switch (action.type) {
    case UPDATE_USER_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case UPDATE_USER_SUCCESS:
      return {
        ...state,
        loading: false,
        success: action.payload,
        passUpdated: action.payload2,
      };
    default:
      return state;
  }
};

export const addCoverPhotoReducer = (state = { success: false }, action) => {
  switch (action.type) {
    case ADD_COVER_PHOTO_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case ADD_COVER_PHOTO_SUCCESS:
      return {
        ...state,
        loading: false,
        success: action.payload,
        msg: action.payload2,
      };
    default:
      return state;
  }
};

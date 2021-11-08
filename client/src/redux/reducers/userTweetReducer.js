import {
  CREATE_USER_RETWEET_REQUEST,
  CREATE_USER_RETWEET_SUCCESS,
  CREATE_USER_TWEET_REQUEST,
  CREATE_USER_TWEET_SUCCESS,
  GET_ALL_TWEET_REQUEST,
  GET_ALL_TWEET_SUCCESS,
  SAVE_TWEET_REQUEST,
  SAVE_TWEET_SUCCESS,
  USER_COMMENT_REQUEST,
  USER_COMMENT_SUCCESS,
} from '../constants';

export const userTweetReducer = (state = {}, action) => {
  switch (action.type) {
    case CREATE_USER_TWEET_REQUEST:
      return { ...state, loading: true };
    case CREATE_USER_TWEET_SUCCESS:
      return {
        ...state,
        loading: false,
      };
    default:
      return state;
  }
};

export const getAllTweetReducer = (state = {}, action) => {
  switch (action.type) {
    case GET_ALL_TWEET_REQUEST:
      return { ...state, loading: true };
    case GET_ALL_TWEET_SUCCESS:
      return {
        ...state,
        loading: false,
        allTweets: action.payload,
      };
    default:
      return state;
  }
};

export const userCommentReducer = (state = {}, action) => {
  switch (action.type) {
    case USER_COMMENT_REQUEST:
      return { ...state, loading: true };
    case USER_COMMENT_SUCCESS:
      return {
        ...state,
        loading: false,
      };
    default:
      return state;
  }
};

export const userRetweetReducer = (state = {}, action) => {
  switch (action.type) {
    case CREATE_USER_RETWEET_REQUEST:
      return { ...state, loading: true };
    case CREATE_USER_RETWEET_SUCCESS:
      return {
        ...state,
        loading: false,
        allTweets: action.payload,
      };
    default:
      return state;
  }
};

export const saveTweetReducer = (state = {}, action) => {
  switch (action.type) {
    case SAVE_TWEET_REQUEST:
      return { ...state, loading: true };
    case SAVE_TWEET_SUCCESS:
      return {
        ...state,
        loading: false,
        saveStatus: action.payload,
      };
    default:
      return state;
  }
};

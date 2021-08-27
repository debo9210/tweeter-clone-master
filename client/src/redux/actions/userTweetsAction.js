import {
  CREATE_USER_TWEET_REQUEST,
  CREATE_USER_TWEET_SUCCESS,
  GET_ALL_TWEET_REQUEST,
  GET_ALL_TWEET_SUCCESS,
  GET_ERRORS,
  USER_COMMENT_REQUEST,
  CREATE_USER_RETWEET_REQUEST,
  CREATE_USER_RETWEET_SUCCESS,
  GET_SPECIFIC_USER_TWEET_REQUEST,
  GET_SPECIFIC_USER_TWEET_SUCCESS,
} from '../constants';
import { clearErrors } from './authActions';
import axios from 'axios';

export const getAllTweets = () => (dispatch) => {
  dispatch(clearErrors());
  dispatch({ type: GET_ALL_TWEET_REQUEST });

  axios
    .get(`/api/tweets/get-tweets`)
    .then((res) => {
      // console.log(res.data);

      dispatch({
        type: GET_ALL_TWEET_SUCCESS,
        payload: res.data,
      });
    })
    .catch((err) =>
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data,
      })
    );
};

export const getSpecificUserTweets = (username) => (dispatch) => {
  dispatch(clearErrors());
  dispatch({ type: GET_SPECIFIC_USER_TWEET_REQUEST });

  axios
    .get(`/api/tweets/get-tweets/${username}`)
    .then((res) => {
      // console.log(res.data);

      dispatch({
        type: GET_SPECIFIC_USER_TWEET_SUCCESS,
        payload: res.data,
      });
    })
    .catch((err) =>
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data,
      })
    );
};

export const createUserTweet = (tweet) => (dispatch) => {
  dispatch(clearErrors());
  dispatch({ type: CREATE_USER_TWEET_REQUEST });

  axios
    .post(`/api/tweets/add-user-tweet`, tweet, {
      header: {
        'Content-Type': 'multipart/form-data',
      },
    })
    .then((res) => {
      // console.log(res.data);
      dispatch({ type: CREATE_USER_TWEET_SUCCESS });

      dispatch({
        type: GET_ALL_TWEET_SUCCESS,
        payload: res.data,
      });
    })
    .catch((err) =>
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data,
      })
    );
};

export const createUserComment = (comment, id) => (dispatch) => {
  dispatch(clearErrors());
  dispatch({ type: USER_COMMENT_REQUEST });

  // console.log(id)

  axios
    .post(`/api/tweets/add-user-comment/${id}`, comment, {
      header: {
        'Content-Type': 'multipart/form-data',
      },
    })
    .then((res) => {
      // console.log(res.data);
      dispatch({ type: CREATE_USER_TWEET_SUCCESS });

      dispatch({
        type: GET_ALL_TWEET_SUCCESS,
        payload: res.data,
      });
    })
    .catch((err) =>
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data,
      })
    );
};

export const createUserRetweet = (username, action, id) => async (dispatch) => {
  dispatch(clearErrors());
  dispatch({ type: CREATE_USER_RETWEET_REQUEST });

  try {
    const { data } = await axios.post(
      `/api/tweets/add-user-action/${username}/${action}/${id}`
    );
    dispatch({ type: CREATE_USER_RETWEET_SUCCESS });
    dispatch({
      type: GET_ALL_TWEET_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: GET_ERRORS,
      payload: error.response.data,
    });
  }
};

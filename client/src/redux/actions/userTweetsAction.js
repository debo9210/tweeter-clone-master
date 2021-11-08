import {
  CREATE_USER_TWEET_REQUEST,
  CREATE_USER_TWEET_SUCCESS,
  GET_ALL_TWEET_REQUEST,
  GET_ALL_TWEET_SUCCESS,
  GET_ERRORS,
  USER_COMMENT_REQUEST,
  CREATE_USER_RETWEET_REQUEST,
  CREATE_USER_RETWEET_SUCCESS,
  // eslint-disable-next-line
  SAVE_TWEET_REQUEST,
  // eslint-disable-next-line
  SAVE_TWEET_SUCCESS,
} from '../constants';
import { clearErrors } from './authActions';
import axios from 'axios';

export const getAllTweets = () => (dispatch) => {
  dispatch(clearErrors());

  dispatch({ type: GET_ALL_TWEET_REQUEST });

  axios
    .get(`/api/tweets/get-tweets`)
    .then((res) => {
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

  axios
    .post(`/api/tweets/add-user-comment/${id}`, comment, {
      header: {
        'Content-Type': 'multipart/form-data',
      },
    })
    .then((res) => {
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

export const createUserRetweet =
  (username, action, twtID, userID) => async (dispatch) => {
    dispatch(clearErrors());
    dispatch({ type: CREATE_USER_RETWEET_REQUEST });
    // dispatch({ type: GET_ALL_TWEET_REQUEST });

    try {
      const { data } = await axios.post(
        `/api/tweets/add-user-action/${username}/${action}/${twtID}/${userID}`
      );
      dispatch({
        type: CREATE_USER_RETWEET_SUCCESS,
        payload: data,
      });

      // console.log(data);

      // dispatch({
      //   type: GET_ALL_TWEET_SUCCESS,
      //   payload: data,
      // });
    } catch (error) {
      dispatch({
        type: GET_ERRORS,
        payload: error.response.data,
      });
    }
  };

export const createSavedTweet = (tweetID, userID) => (dispatch) => {
  dispatch(clearErrors());
  // dispatch({ type: SAVE_TWEET_REQUEST });
  dispatch({ type: GET_ALL_TWEET_REQUEST });
  axios
    .post(`/api/tweets/savedTweet/${tweetID}/${userID}`)
    .then((res) => {
      // dispatch({
      //   type: SAVE_TWEET_SUCCESS,
      //   payload: res.data,
      // });

      dispatch({
        type: GET_ALL_TWEET_SUCCESS,
        payload: res.data.tweetsArr,
      });
    })
    .catch((err) =>
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data,
      })
    );
};

export const createLikeComment =
  (userID, action, commentID, tweetID) => async (dispatch) => {
    dispatch(clearErrors());

    try {
      const { data } = await axios.post(
        `/api/tweets/like-users-comment/${userID}/${action}/${commentID}/${tweetID}`
      );

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

import { createStore, combineReducers, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension';
import { errorReducer } from './redux/reducers/errorReducer';
import { currentUserReducer } from './redux/reducers/authReducer';
import {
  updateUserReducer,
  addCoverPhotoReducer,
} from './redux/reducers/updateUserReducer';
import {
  getUserReducer,
  getAllUsersReducer,
} from './redux/reducers/getUserReducer';
import {
  userTweetReducer,
  userCommentReducer,
  userRetweetReducer,
  getAllTweetReducer,
  getSpecificUserTweetsReducer,
} from './redux/reducers/userTweetReducer';

const reducers = combineReducers({
  getErrors: errorReducer,
  currentUser: currentUserReducer,
  updateUser: updateUserReducer,
  getUser: getUserReducer,
  getAllUsers: getAllUsersReducer,
  coverPhoto: addCoverPhotoReducer,
  userTweets: userTweetReducer,
  getAllTweets: getAllTweetReducer,
  userComment: userCommentReducer,
  userRetweet: userRetweetReducer,
  specificUserTweets: getSpecificUserTweetsReducer,
});

const initialState = {};

const middleware = [thunk];

const devTools =
  process.env.NODE_ENV === 'production'
    ? applyMiddleware(...middleware)
    : composeWithDevTools(applyMiddleware(...middleware));

const store = createStore(reducers, initialState, devTools);

export default store;

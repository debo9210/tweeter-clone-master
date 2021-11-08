const express = require('express');
const passport = require('passport');

const router = express.Router();

const addUserTweet =
  require('../../controllers/usersTweetsController').addUserTweet;
const getAllTweets =
  require('../../controllers/usersTweetsController').getAllTweets;
const addUserComment =
  require('../../controllers/usersTweetsController').addUserComment;
const addUserRetweet =
  require('../../controllers/usersTweetsController').addUserRetweet;
const addUserSavedTweet =
  require('../../controllers/usersTweetsController').addUserSavedTweet;
const likeUsersCommment =
  require('../../controllers/usersTweetsController').likeUsersCommment;

//load multer config
const upload = require('../../config/multerConfig').upload;

// @Route Post api/tweets/add-user-tweet
// @Desc route to add user tweet
// @Access Private
router.post(
  '/add-user-tweet',
  upload.single('tweetImage'),
  passport.authenticate('jwt', { session: false }),
  addUserTweet
);

// @Route GET api/tweets/get-tweets
// @Desc route to get all tweets
// @Access Private
router.get(
  '/get-tweets',
  passport.authenticate('jwt', { session: false }),
  getAllTweets
);

// @Route Post api/tweets/add-user-comment/:id
// @Desc route to add user comment
// @Access Private
router.post(
  '/add-user-comment/:id',
  upload.single('replyImage'),
  passport.authenticate('jwt', { session: false }),
  addUserComment
);

// @Route Post api/tweets/like-users-comment/:id/:action/:commentID/:tweetID
// @Desc route to like users comment
// @Access Private
router.post(
  '/like-users-comment/:id/:action/:commentID/:tweetID',
  passport.authenticate('jwt', { session: false }),
  likeUsersCommment
);

// @Route Post api/tweets/add-user-action/:username/:action/:id
// @Desc route to add user retweet
// @Access Private
router.post(
  '/add-user-action/:username/:action/:id/:userid',
  passport.authenticate('jwt', { session: false }),
  addUserRetweet
);

// @Route Post api/tweets/savedTweet/:tweetID/userID
// @Desc route to save tweets
// @Access Private
router.post(
  '/savedTweet/:tweetID/:userID',
  passport.authenticate('jwt', { session: false }),
  addUserSavedTweet
);

module.exports = router;

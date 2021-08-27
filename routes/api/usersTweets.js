const express = require('express');
const passport = require('passport');

const router = express.Router();

const addUserTweet =
  require('../../controllers/usersTweetsController').addUserTweet;
const getAllTweets =
  require('../../controllers/usersTweetsController').getAllTweets;
const addUserComment =
  require('../../controllers/usersTweetsController').addUserComment;
const getSpecificUserTweets =
  require('../../controllers/usersTweetsController').getSpecificUserTweets;
const addUserRetweet =
  require('../../controllers/usersTweetsController').addUserRetweet;

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

// @Route GET api/tweets/get-tweets/:username
// @Desc route to get tweets by username
// @Access Private
router.get(
  '/get-tweets/:username',
  passport.authenticate('jwt', { session: false }),
  getSpecificUserTweets
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

// @Route Post api/tweets/add-user-action/:username/:action/:id
// @Desc route to add user retweet
// @Access Private
router.post(
  '/add-user-action/:username/:action/:id',
  passport.authenticate('jwt', { session: false }),
  addUserRetweet
);

module.exports = router;

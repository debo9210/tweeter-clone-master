const express = require('express');
const passport = require('passport');

const router = express.Router();

const followUser = require('../../controllers/userFollowController').followUser;

// @Route Post /api/follow/:name/:id/:action
// @Desc route to follow and unfollow user
// @Access Private
router.post(
  '/:name/:id/:action',
  passport.authenticate('jwt', { session: false }),
  followUser
);

module.exports = router;

const express = require('express');
const passport = require('passport');

const router = express.Router();

//load  controllers
const userRegister = require('../../controllers/usersController').userRegister;
const userLogin = require('../../controllers/usersController').userLogin;
const checkEmail = require('../../controllers/usersController').checkEmail;
const updateUserDetails =
  require('../../controllers/usersController').updateUserDetails;
const getCurrentUser =
  require('../../controllers/usersController').getCurrentUser;
const getUser = require('../../controllers/usersController').getUser;
const getAllUsers = require('../../controllers/usersController').getAllUsers;
const addCoverPhoto =
  require('../../controllers/usersController').addCoverPhoto;

//load multer config
const upload = require('../../config/multerConfig').upload;
//load stream image func
const streamImage = require('../../config/multerConfig').streamImage;

// @Route POST api/users/check-email
// @Desc route to check if email exists
// @Access Public
router.post('/check-email', checkEmail);

// @Route POST api/users/register
// @Desc route to register users
// @Access Public
router.post('/register', userRegister);

// @Route Post api/users/login
// @Desc route to login user / return jwt token
// @Access Public
router.post('/login', userLogin);

// @Route Put api/users/update-user
// @Desc route to update user
// @Access Private
router.put(
  '/update-user',
  upload.fields([
    {
      name: 'userImage',
      maxCount: 1,
    },
    {
      name: 'coverPhoto',
      maxCount: 1,
    },
  ]),
  //   upload.single('userImage'),
  passport.authenticate('jwt', { session: false }),
  updateUserDetails
);

// @Route Put api/users/add-cover-photo
// @Desc route to add cover photo
// @Access Private
router.put(
  '/add-cover-photo',
  upload.single('coverPhoto'),
  passport.authenticate('jwt', { session: false }),
  addCoverPhoto
);

// @Route GET api/users/current
// @Desc Return current user route
// @Access Private protected route
router.get(
  '/current',
  passport.authenticate('jwt', { session: false }),
  getCurrentUser
);

// @Route GET api/users/get-user/:name
// @Desc get user by name
// @Access Private protected route
router.get(
  '/get-user/:name',
  passport.authenticate('jwt', { session: false }),
  getUser
);

// @Route GET api/users/getAllUsers
// @Desc get user by name
// @Access Private protected route
router.get(
  '/getAllUsers',
  passport.authenticate('jwt', { session: false }),
  getAllUsers
);

// @Route Get api/users/image/:id, api/users/cover-photo/:id, api/users/tweet-image/:id
// @Desc stream  image to browser
// @Access Public
router.get('/image/:id', streamImage);
router.get('/cover-photo/:id', streamImage);
router.get('/tweet-image/:id', streamImage);

module.exports = router;

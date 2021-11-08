const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const keys = require('../config/keys').secretOrKey;
const Validator = require('validator');

//load user model
const User = require('../models/User');

//load input validation
const validateRegisterInput = require('../validation/register');
const validateLoginInput = require('../validation/login');

//check if user exist
const checkEmail = (req, res) => {
  User.findOne({ email: req.body.email })
    .then((user) => {
      if (user) {
        const error = {};
        error.email = 'Email has already been taken.';
        return res.status(400).json(error);
      }
    })
    .catch((err) => console.log(err));
};

// register user controller
const userRegister = (req, res) => {
  // console.log(req.body);
  const { errors, isValid } = validateRegisterInput(req.body);

  //check validation
  if (!isValid) {
    return res.status(400).json(errors);
  }

  //check if user already exists
  User.findOne({ email: req.body.email }).then((user) => {
    if (user) {
      errors.email = 'Email has already been taken.';
      return res.status(400).json(errors);
    } else {
      //create new user
      const newUser = new User({
        name: req.body.name,
        email: req.body.email,
        about: req.body.about,
        password: req.body.password,
        dateOfBirth: req.body.dateOfBirth,
      });

      // hash password and save to db
      bcrypt.genSalt(10, (err, salt) => {
        bcrypt.hash(newUser.password, salt, (err, hash) => {
          if (err) throw Error;
          newUser.password = hash;
          newUser
            .save()
            .then((user) => res.json(user))
            .catch((err) => res.status(501).json(errors));
        });
      });
    }
  });
};

//login user controller and return jwt token
const userLogin = (req, res) => {
  // console.log(req.body);
  const { errors, isValid } = validateLoginInput(req.body);

  //check validation
  if (!isValid) {
    return res.status(400).json(errors);
  }

  const email = req.body.email;
  const password = req.body.password;

  //find user by email or username
  User.findOne({ email }).then((user) => {
    //check for user
    if (!user) {
      errors.email = 'User not found, register yet?';
      return res.status(404).json(errors);
    }

    //check password
    bcrypt.compare(password, user.password).then((isMatch) => {
      if (isMatch) {
        //user password matched

        //create jwt payload
        const payload = {
          id: user.id,
          name: user.name,
          email: user.email,
          password: user.password,
          about: user.about,
          birthMonth: user.dateOfBirth.split(' ')[0],
          birthDay: user.dateOfBirth.split(' ')[1],
          birthYear: user.dateOfBirth.split(' ')[2],
          userImage: user.userImage,
          coverPhoto: user.coverPhoto,
          following: user.following,
          followers: user.followers,
          savedTweets: user.savedTweets,
        };

        //sign token
        jwt.sign(payload, keys, { expiresIn: 3600 * 2 }, (err, token) => {
          res.json({
            success: true,
            token: `Bearer ${token}`,
          });
        });
      } else {
        errors.password = 'Password incorrect';
        return res.status(400).json(errors);
      }
    });
  });
};

const addCoverPhoto = (req, res) => {
  const url = req.protocol + '://' + req.get('host');

  const addCoverImage = {
    coverPhoto: `${url}/api/users/cover-photo/${req.file.filename}`,
  };

  // console.log(addCoverImage);

  User.findByIdAndUpdate(
    req.body.userID,
    { $set: addCoverImage },
    { new: true }
  )
    .then((user) => {
      if (user) {
        // console.log(user);

        //create jwt payload
        const payload = {
          id: user._id,
          name: user.name,
          email: user.email,
          about: user.about,
          password: user.password,
          birthMonth: user.dateOfBirth.split(' ')[0],
          birthDay: user.dateOfBirth.split(' ')[1],
          birthYear: user.dateOfBirth.split(' ')[2],
          userImage: user.userImage,
          coverPhoto: user.coverPhoto,
          following: user.following,
          followers: user.followers,
          savedTweets: user.savedTweets,
        };

        //sign token
        jwt.sign(payload, keys, { expiresIn: 3600 * 2 }, (err, token) => {
          res.json({
            success: true,
            msg: 'cover photo added successfully',
            token: `Bearer ${token}`,
          });
        });
      } else {
        return res.status(404).json({ msg: 'no user found' });
      }
    })
    .catch((err) => res.status(400).json(err));
};

const updateUserDetails = (req, res) => {
  let multerUserImage, multerCoverPhoto;

  if (req.files.userImage) {
    multerUserImage = req.files.userImage[0];
  }

  if (req.files.coverPhoto) {
    multerCoverPhoto = req.files.coverPhoto[0];
  }

  // console.log(multerUserImage);
  // console.log(multerCoverPhoto);

  const url = req.protocol + '://' + req.get('host');
  const { name, password, dateOfBirth, userID, email, about } = req.body;

  let userName, userEmail, userPass, userDOB, userImage, coverPhoto, userAbout;
  User.findById(userID).then((user) => {
    userName = user.name;
    userEmail = user.email;
    userAbout = user.about;
    userPass = user.password;
    userDOB = user.dateOfBirth;
    userImage = user.userImage;
    coverPhoto = user.coverPhoto;
  });

  setTimeout(() => {
    const userUpdate = {
      name: name ? name : userName,
      email: email ? email : userEmail,
      about: about ? about : userAbout,
      password: password !== '' ? password : userPass,
      dateOfBirth: dateOfBirth ? dateOfBirth : userDOB,
      userImage: multerUserImage
        ? `${url}/api/users/image/${multerUserImage.filename}`
        : userImage,
      coverPhoto: multerCoverPhoto
        ? `${url}/api/users/cover-photo/${multerCoverPhoto.filename}`
        : coverPhoto,
    };

    if (password !== '') {
      if (!Validator.isLength(password, { min: 6, max: 30 })) {
        const errors = {};
        errors.password = 'Password must be between 6 and 30 characters';
        return res.status(400).json(errors);
      }

      bcrypt.genSalt(10, (err, salt) => {
        bcrypt.hash(password, salt, (err, hash) => {
          if (err) throw Error;
          userUpdate.password = hash;

          User.findByIdAndUpdate(userID, { $set: userUpdate }, { new: true })
            .then((user) => {
              //create jwt payload
              const payload = {
                id: user._id,
                name: user.name,
                email: user.email,
                password: user.password,
                about: user.about,
                birthMonth: user.dateOfBirth.split(' ')[0],
                birthDay: user.dateOfBirth.split(' ')[1],
                birthYear: user.dateOfBirth.split(' ')[2],
                userImage: user.userImage,
                coverPhoto: user.coverPhoto,
                following: user.following,
                followers: user.followers,
                savedTweets: user.savedTweets,
              };

              //sign token
              jwt.sign(payload, keys, { expiresIn: 3600 * 2 }, (err, token) => {
                res.json({
                  success: true,
                  passwordUpdated: true,
                  token: `Bearer ${token}`,
                });
              });
            })
            .catch((err) => res.status(400).json(err));
        });
      });
    } else {
      User.findByIdAndUpdate(userID, { $set: userUpdate }, { new: true })
        .then((user) => {
          //create jwt payload
          const payload = {
            id: user._id,
            name: user.name,
            email: user.email,
            password: user.password,
            about: user.about,
            birthMonth: user.dateOfBirth.split(' ')[0],
            birthDay: user.dateOfBirth.split(' ')[1],
            birthYear: user.dateOfBirth.split(' ')[2],
            userImage: user.userImage,
            coverPhoto: user.coverPhoto,
            following: user.following,
            followers: user.followers,
            savedTweets: user.savedTweets,
          };

          //sign token
          jwt.sign(payload, keys, { expiresIn: 3600 * 2 }, (err, token) => {
            res.json({
              success: true,
              token: `Bearer ${token}`,
            });
          });
        })
        .catch((err) => res.status(400).json(err));
    }
  }, 1000);
};

const getUser = (req, res) => {
  User.findOne({ name: req.params.name }).then((user) => {
    if (user) {
      return res.json(user);
    } else {
      return res.status(400).json({ msg: 'No user found' });
    }
  });
};

const getCurrentUser = (req, res) => {
  User.findOne({ name: req.params.name })
    .then((user) => {
      if (user) {
        // create jwt payload
        const payload = {
          id: user._id,
          name: user.name,
          email: user.email,
          about: user.about,
          password: user.password,
          birthMonth: user.dateOfBirth.split(' ')[0],
          birthDay: user.dateOfBirth.split(' ')[1],
          birthYear: user.dateOfBirth.split(' ')[2],
          userImage: user.userImage,
          coverPhoto: user.coverPhoto,
          following: user.following,
          followers: user.followers,
          savedTweets: user.savedTweets,
        };

        //sign token
        jwt.sign(payload, keys, { expiresIn: 3600 * 2 }, (err, token) => {
          res.json({
            token: `Bearer ${token}`,
          });
        });
      } else {
        return res.status(400).json({ msg: 'No user found' });
      }
    })
    .catch((err) => console.log(err));
};

const getAllUsers = (req, res) => {
  User.find().then((users) => {
    if (users) {
      return res.json(users);
    } else {
      return res.status(400).json({ msg: 'No users found' });
    }
  });
};

// const getCurrentUser = (req, res) => {
//   res.json({
//     id: req.user.id,
//     name: req.user.name,
//     email: req.user.email,
//     about: req.user.about,
//     password: req.user.password,
//     dateOfBirth: req.user.dateOfBirth,
//     userImage: req.user.userImage,
//     coverPhoto: req.user.coverPhoto,
//   });
// };

module.exports = {
  userRegister,
  checkEmail,
  userLogin,
  getCurrentUser,
  updateUserDetails,
  getUser,
  getAllUsers,
  addCoverPhoto,
};

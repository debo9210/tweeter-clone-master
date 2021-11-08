const jwt = require('jsonwebtoken');
const keys = require('../config/keys').secretOrKey;

//load user model
const User = require('../models/User');

const followUser = (req, res) => {
  // console.log(req.params.action);
  // console.log(req.params.name);
  // console.log(req.params.id);

  User.findOne({ name: req.params.name })
    .then((user) => {
      if (user) {
        if (req.params.action === 'Follow') {
          user.following.unshift(req.params.id);

          const followingUser = user.id;

          User.findById(req.params.id)
            .then((user) => {
              user.followers.unshift(followingUser);
              user.save();
            })
            .catch((err) => console.log(err));
        } else if (req.params.action === 'Following') {
          for (let i = 0; i < user.following.length; i++) {
            if (user.following[i] === req.params.id) {
              user.following.splice(i, 1);
            }
          }

          const followingUser = user.id;

          User.findById(req.params.id)
            .then((user) => {
              for (let i = 0; i < user.followers.length; i++) {
                if (user.followers[i] === followingUser) {
                  user.followers.splice(i, 1);
                }
              }
              user.save();
            })
            .catch((err) => console.log(err));
        }
        user.save();

        setTimeout(() => {
          User.find()
            .then((users) => {
              users
                .filter((user) => user.name === req.params.name)
                .map((user) => {
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
                  jwt.sign(
                    payload,
                    keys,
                    { expiresIn: 3600 * 2 },
                    (err, token) => {
                      res.json({
                        token: `Bearer ${token}`,
                        allUsers: users,
                      });
                    }
                  );
                });
            })
            .catch((err) => console.log(err));
        }, 1000);
      }
    })
    .catch((err) => console.log(err));
};

module.exports = { followUser };

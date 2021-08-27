//load user model
const User = require('../models/User');

const followUser = (req, res) => {
  //   console.log(req.params.action);
  //   console.log(req.params.name);
  //   console.log(req.params.id);

  User.findOne({ name: req.params.name })
    .then((user) => {
      if (user) {
        if (req.params.action === 'Follow') {
          user.following.unshift(req.params.id);
        } else if (req.params.action === 'Following') {
          for (let i = 0; i < user.following.length; i++) {
            if (user.following[i] === req.params.id) {
              user.following.splice(i, 1);
            }
          }
        }

        user.save();
      }
    })
    .catch((err) => console.log(err));
};

module.exports = { followUser };

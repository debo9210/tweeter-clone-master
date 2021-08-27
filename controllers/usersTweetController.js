//load userTweet model
const UserTweet = require('../models/UserTweet');

const getAllTweets = (req, res) => {
  UserTweet.find()
    .then((allTweets) => res.json(allTweets))
    .catch((err) => res.status(400).json({ msg: 'no tweets found' }));
};

const getSpecificUserTweets = (req, res) => {
  UserTweet.find({ name: req.params.username })
    .then((tweet) => res.json(tweet))
    .catch((err) => res.status(400).json({ msg: 'no tweet found' }));
};

const addUserTweet = (req, res) => {
  const url = req.protocol + '://' + req.get('host');

  const userTweet = new UserTweet({
    user: req.body.userID,
    userTweet: req.body.userTweet,
    name: req.body.username,
    userImage: req.body.userimage,
    whoCanReply: req.body.whoCanReply,
    tweetImage: req.file
      ? `${url}/api/users/tweet-image/${req.file.filename}`
      : null,
  });

  userTweet.save();

  setTimeout(() => {
    UserTweet.find()
      .then((allTweets) => res.json(allTweets))
      .catch((err) => res.status(400).json({ msg: 'no tweets found' }));
  }, 1000);
};

const addUserComment = (req, res) => {
  const url = req.protocol + '://' + req.get('host');

  //   console.log(req.params.id);
  //   console.log(req.body);
  //   console.log(req.file);

  UserTweet.findById(req.params.id)
    .then((twt) => {
      const newComment = {
        user: req.body.userID,
        replyText: req.body.replyText,
        name: req.body.name,
        userImage: req.body.userImage,
        replyImage: req.file
          ? `${url}/api/users/tweet-image/${req.file.filename}`
          : null,
      };

      twt.comments.unshift(newComment);

      twt.save();
      //   .then((comments) => res.json(comments));

      setTimeout(() => {
        UserTweet.find()
          .then((allTweets) => res.json(allTweets))
          .catch((err) => res.status(400).json({ msg: 'no tweets found' }));
      }, 1000);
    })
    .catch((err) => res.status(404).json({ msg: 'no comment found' }));
};

function containsObject(obj, list) {
  var i;
  for (i = 0; i < list.length; i++) {
    if (list[i] === obj) {
      return true;
    }
  }

  return false;
}

const addUserRetweet = (req, res) => {
  //   console.log(req.params.action);
  UserTweet.findById(req.params.id)
    .then((tweet) => {
      if (tweet) {
        if (req.params.action === 'Retweet') {
          let dbOBj;
          tweet.retweets.map((i) => {
            if (i.retweetedBy === req.params.username) {
              dbOBj = i;
            }
          });

          if (!containsObject(dbOBj, tweet.retweets)) {
            tweet.retweets.unshift({ retweetedBy: req.params.username });
          }
        } else if (req.params.action === 'Like') {
          let dbOBj;
          tweet.likes.map((i) => {
            if (i.likedBy === req.params.username) {
              dbOBj = i;
            }
          });

          if (!containsObject(dbOBj, tweet.likes)) {
            tweet.likes.unshift({ likedBy: req.params.username });
          }
        } else if (req.params.action === 'Retweeted') {
          for (let i = 0; i < tweet.retweets.length; i++) {
            if (tweet.retweets[i].retweetedBy === req.params.username) {
              tweet.retweets.splice(i, 1);
            }
          }
        } else if (req.params.action === 'Liked') {
          for (let i = 0; i < tweet.likes.length; i++) {
            if (tweet.likes[i].likedBy === req.params.username) {
              tweet.likes.splice(i, 1);
            }
          }
        }
        tweet.save();

        setTimeout(() => {
          UserTweet.find()
            .then((allTweets) => res.json(allTweets))
            .catch((err) => res.status(400).json({ msg: 'no tweets found' }));
        }, 1000);
      }
    })
    .catch((err) =>
      res.status(500).json({ msg: 'action can not be performed' })
    );
};

module.exports = {
  addUserTweet,
  getAllTweets,
  getSpecificUserTweets,
  addUserComment,
  addUserRetweet,
};

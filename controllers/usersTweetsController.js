const containsObject = require('../utils/containsObject');

//load userTweet model
const UserTweet = require('../models/UserTweet');

//load user Model
const User = require('../models/User');

const getAllTweets = (req, res) => {
  UserTweet.find()
    .then((allTweets) => res.json(allTweets))
    .catch((err) => res.status(400).json({ msg: 'no tweets found' }));
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

      setTimeout(() => {
        UserTweet.find()
          .then((allTweets) => res.json(allTweets))
          .catch((err) => res.status(400).json({ msg: 'no tweets found' }));
      }, 1000);
    })
    .catch((err) => res.status(404).json({ msg: 'no comment found' }));
};

const likeUsersCommment = (req, res) => {
  // console.log(req.params.id);
  // console.log(req.params.action);
  // console.log(req.params.commentID);
  // console.log(req.params.tweetID);

  if (req.params.action === 'Like') {
    UserTweet.findById(req.params.tweetID)
      .then((tweet) => {
        for (let i = 0; i < tweet.comments.length; i++) {
          if (tweet.comments[i].id === req.params.commentID) {
            tweet.comments[i].likes.unshift(req.params.id);
          }
        }
        tweet.save();

        setTimeout(() => {
          UserTweet.find()
            .then((tweet) => res.json(tweet))
            .catch((err) => res.status(400).json({ errMsg: 'no tweet found' }));
        }, 1000);
      })
      .catch((err) => console.log(err));
  } else if (req.params.action === 'Unlike') {
    UserTweet.findById(req.params.tweetID)
      .then((tweet) => {
        for (let i = 0; i < tweet.comments.length; i++) {
          if (tweet.comments[i].id === req.params.commentID) {
            // console.log(tweet.comments[i]);
            tweet.comments[i].likes.splice(i, 1);
          }
        }
        tweet.save();

        setTimeout(() => {
          UserTweet.find()
            .then((tweet) => res.json(tweet))
            .catch((err) => res.status(400).json({ errMsg: 'no tweet found' }));
        }, 1000);
      })
      .catch((err) => console.log(err));
  }
};

const addUserRetweet = (req, res) => {
  // console.log(req.params.userid);
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

          for (let i = 0; i < tweet.userRetweetedID.length; i++) {
            if (tweet.userRetweetedID[i] === req.params.userid) {
              return;
            }
          }
          tweet.userRetweetedID.unshift(req.params.userid);
        } else if (req.params.action === 'Like') {
          let dbOBj;
          tweet.likes.map((i) => {
            if (i.likedBy === req.params.username) {
              dbOBj = i;
            }
          });

          if (!containsObject(dbOBj, tweet.likes)) {
            tweet.likes.unshift({
              likedBy: req.params.username,
            });
          }

          for (let i = 0; i < tweet.userLikedID.length; i++) {
            if (tweet.userLikedID[i] === req.params.userid) {
              return;
            }
          }
          tweet.userLikedID.unshift(req.params.userid);
        } else if (req.params.action === 'Retweeted') {
          for (let i = 0; i < tweet.retweets.length; i++) {
            if (tweet.retweets[i].retweetedBy === req.params.username) {
              tweet.retweets.splice(i, 1);
            }
          }

          for (let i = 0; i < tweet.userRetweetedID.length; i++) {
            if (tweet.userRetweetedID[i] === req.params.userid) {
              tweet.userRetweetedID.splice(i, 1);
            }
          }
        } else if (req.params.action === 'Liked') {
          for (let i = 0; i < tweet.likes.length; i++) {
            if (tweet.likes[i].likedBy === req.params.username) {
              tweet.likes.splice(i, 1);
            }
          }

          for (let i = 0; i < tweet.userLikedID.length; i++) {
            if (tweet.userLikedID[i] === req.params.userid) {
              tweet.userLikedID.splice(i, 1);
            }
          }
        }
        tweet.save();

        setTimeout(() => {
          UserTweet.find()
            .then((allTweets) => res.json(allTweets))
            .catch((err) => res.status(400).json({ msg: 'no tweets found' }));
        }, 2000);
      }
    })
    .catch((err) =>
      res.status(500).json({ msg: 'action can not be performed' })
    );
};

const addUserSavedTweet = (req, res) => {
  User.findById(req.params.userID)
    .then((user) => {
      for (let i = 0; i < user.savedTweets.length; i++) {
        if (user.savedTweets[i].userTweetID === req.params.tweetID) {
          res.json({ msg: 'tweet saved already' });
          return;
        }
      }
      user.savedTweets.unshift({ userTweetID: req.params.tweetID });
      user.save();
    })
    .catch((err) => console.log(err));

  UserTweet.find()
    .then((allTweets) => {
      for (let i = 0; i < allTweets.length; i++) {
        if (allTweets[i].id === req.params.tweetID) {
          for (let j = 0; j < allTweets[i].saved.length; j++) {
            if (allTweets[i].saved[j] === req.params.userID) {
              return;
            }
          }
          allTweets[i].saved.unshift(req.params.userID);
          // console.log(allTweets[i].saved);
          allTweets[i].save();
        }
      }
      res.json({ msg: 'tweet saved', tweetsArr: allTweets });
    })
    .catch((err) => res.status(501).json({ msg: 'tweet not saved' }));
};

// const getUserSavedTweet = (req, res) => {
//   // console.log(req.params.userID);

//   const tempUser = async () => {
//     const queryUser = await User.findById(req.params.userID);
//     const tweetID = queryUser.savedTweets.map((twt) => twt.userTweetID);

//     UserTweet.find()
//       .then((tweet) => {
//         const filteredTweets = tweet
//           .map((twt) => twt)
//           .filter((twt) => tweetID.includes(twt.id));

//         res.json(filteredTweets);
//       })
//       .catch((err) => console.log(err));
//   };

//   tempUser();
// };

module.exports = {
  addUserTweet,
  getAllTweets,
  addUserComment,
  addUserRetweet,
  addUserSavedTweet,
  likeUsersCommment,
};

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const UserTweetSchema = new Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: 'user',
  },
  userTweet: {
    type: String,
    required: true,
  },
  name: {
    type: String,
  },
  userImage: {
    type: String,
  },
  tweetImage: {
    type: String,
  },
  whoCanReply: {
    type: String,
  },
  likes: [
    {
      likedBy: {
        type: String,
      },
    },
  ],
  retweets: [
    {
      retweetedBy: {
        type: String,
      },
    },
  ],

  saved: [
    {
      user: {
        type: Schema.Types.ObjectId,
        ref: 'user',
      },
    },
  ],
  comments: [
    {
      user: {
        type: Schema.Types.ObjectId,
        ref: 'user',
      },
      replyText: {
        type: String,
        required: true,
      },
      name: {
        type: String,
      },
      userImage: {
        type: String,
      },
      replyImage: {
        type: String,
      },
      date: {
        type: Date,
        default: Date.now,
      },
      likes: [
        {
          user: {
            type: Schema.Types.ObjectId,
            ref: 'user',
          },
        },
      ],
    },
  ],
  date: {
    type: Date,
    default: Date.now,
  },
});

module.exports = UserTweet = mongoose.model('userTweet', UserTweetSchema);

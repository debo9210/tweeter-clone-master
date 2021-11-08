const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const UserSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  about: {
    type: String,
  },
  password: {
    type: String,
    required: true,
  },
  dateOfBirth: {
    type: String,
    required: true,
  },
  userImage: {
    type: String,
  },
  coverPhoto: {
    type: String,
  },
  followers: {
    type: Array,
  },
  following: {
    type: Array,
  },
  savedTweets: {
    type: Array,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = User = mongoose.model('users', UserSchema);

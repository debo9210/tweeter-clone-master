const express = require('express');
const mongoose = require('mongoose');
const path = require('path');
const colors = require('colors');
const passport = require('passport');

const app = express();

// import routes routes
const userRoutes = require('./routes/api/users');
const userTweetRoutes = require('./routes/api/usersTweets');
const userFollowRoutes = require('./routes/api/userFollow');

//db congig
const DB = require('./config/keys').mongoURI;
mongoose
  .connect(DB, {
    useUnifiedTopology: true,
    useNewUrlParser: true,
    // useFindAndModify: false,
  })
  .then(() => console.log('Connected to database'.rainbow))
  .catch((err) => console.log(err));

//body parser
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

//passport middleware
app.use(passport.initialize());
// deserialize cookie from the browser
app.use(passport.session());

//Passport config
require('./config/passportStrategy')(passport);

app.get('/', (req, res) => {
  res.send('Welcome to tweeter clone');
});

//Use routes
app.use('/api/users', userRoutes);
app.use('/api/tweets', userTweetRoutes);
app.use('/api/follow', userFollowRoutes);

//server static assets if in production
if (process.env.NODE_ENV === 'production') {
  //set static folder
  app.use(express.static('client/build'));

  app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
  });
}

const port = process.env.PORT || 5000;

app.listen(port, () => {
  console.log(`Server running @port ${port}`.magenta);
});

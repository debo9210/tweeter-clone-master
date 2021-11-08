import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import jwt_decode from 'jwt-decode';
import { setAuthToken } from './utils/setAuthToken';
import { setCurrentUser, logoutUser } from './redux/actions/authActions';
import store from './store';
import LandingPage from './components/LandingPage';
import SignUp from './components/SignUp';
// eslint-disable-next-line
import Footer from './components/Footer';
import Login from './components/Login';
import TweeterCloneMain from './components/TweeterCloneMain';
import './css/App.css';
import TweeterCloneSettings from './components/TweeterCloneSettings';

//check for token
if (localStorage.jwtToken) {
  //set auth token header auth
  setAuthToken(localStorage.jwtToken);

  //decode token and get user info and expiratiion
  const decoded = jwt_decode(localStorage.jwtToken);

  //set user and isAuthenticated
  store.dispatch(setCurrentUser(decoded));

  //check for expired token
  const currentTime = Date.now() / 1000;

  if (decoded.exp < currentTime) {
    //logout user
    store.dispatch(logoutUser());
    window.location.href = '/';
  }
}

function App() {
  return (
    <Router>
      <div className='App'>
        {/* <LandingPage /> */}
        <Route path='/' component={LandingPage} exact />
        <Route path='/signup' component={SignUp} exact />
        <Route path='/login' component={Login} exact />
        <Route path='/home' component={TweeterCloneMain} exact />
        <Route path='/settings' component={TweeterCloneSettings} exact />
        {/* <Footer /> */}
      </div>
    </Router>
  );
}

export default App;

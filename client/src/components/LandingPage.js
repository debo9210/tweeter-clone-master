import React, { useRef, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import LandingImage from '../images/tweeterBanner.png';

const LandingPage = () => {
  const history = useHistory();

  const landingHeadingRef = useRef(null);
  const landingPageRef = useRef(null);

  const showSignUpHandler = (e) => {
    if (e.target.innerText === 'Sign up') {
      history.push('/signup');
    } else {
      history.push('/login');
    }
  };

  useEffect(() => {
    var i = 0;
    const greeting = [
      '',
      'Hello there',
      'Bonjour',
      'Hola',
      'Ciao',
      'Hallo',
      'Привет',
      'Hallo daar',
      '你好呀',
      'こんにちは',
      'أهلا بك',
    ];

    // eslint-disable-next-line
    var myfunc = setInterval(() => {
      i = i + 1;

      // landingHeadingRef.current.innerText = greeting[i];

      if (Object.values(landingHeadingRef)[0] !== null) {
        landingHeadingRef.current.innerText = greeting[i];
      }

      if (i === greeting.length - 1) {
        i = 0;
        // clearInterval(myfunc);
      }
    }, 1000);
  }, []);

  return (
    <div className='LandingPage' ref={landingPageRef}>
      <div className='LandingImage'>
        <img src={LandingImage} alt='landing' />
      </div>
      <div className='LandingPageLoginContainer'>
        <div className='LandingPageLogin'>
          <h1>
            <span ref={landingHeadingRef}>Hello there</span>!
          </h1>
          <h3>Join Twitter clone today.</h3>
          <div className='LandingPageBtn'>
            <button
              className='LandingPageBtnSignUp'
              onClick={showSignUpHandler}
            >
              Sign up
            </button>
            <button className='LandingPageBtnLogIn' onClick={showSignUpHandler}>
              Log in
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LandingPage;

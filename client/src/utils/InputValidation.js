import { validateEmail } from './emailValidation';

export const validateSignupInput = (
  userName,
  userEmail,
  birthMonth,
  birthday,
  birthYear,
  userPassword,
  confirmPassword,
  nextBtnRef
) => {
  let passConfirmation;
  if (userPassword !== '' && confirmPassword !== '') {
    passConfirmation = userPassword === confirmPassword;
  }

  if (
    userName &&
    validateEmail(userEmail) &&
    birthMonth &&
    birthday &&
    birthYear &&
    passConfirmation
  ) {
    if (Object.values(nextBtnRef)[0] !== null) {
      nextBtnRef.current.lastChild.style.background = '#1A91DA';
      nextBtnRef.current.lastChild.style.cursor = 'pointer';
      //   nextBtnRef.current.firstChild.disabled = false;
      nextBtnRef.current.lastChild.style.pointerEvents = 'unset';
    }
  } else {
    if (Object.values(nextBtnRef)[0] !== null) {
      nextBtnRef.current.lastChild.style.background = '#8ed0f9';
      //   nextBtnRef.current.firstChild.disabled = true;
      nextBtnRef.current.lastChild.style.pointerEvents = 'none';
    }
  }
};

export const changeBorder = (ref) => {
  ref.current.style.border = '2px solid #1da1f2';
  ref.current.children[0].style.color = '#1da1f2';
};

export const changeBorder2 = (ref) => {
  ref.current.style.borderColor = '#c4cfd6';
  ref.current.children[0].style.color = '#81919F';
};

export const mouseOverHandler = (userEmail, userPass, ref) => {
  if (userEmail !== '' && userPass !== '') {
    ref.current.style.background = '#1A91DA';
  }
};

export const mouseOutHandler = (userEmail, userPass, ref) => {
  if (userEmail !== '' && userPass !== '') {
    ref.current.style.background = '#1da1f2';
  }
};

export const btnActive = (userEmail, userPass, ref) => {
  if (userEmail !== '' && userPass !== '') {
    if (Object.values(ref)[0] !== null) {
      ref.current.style.background = '#1da1f2';
      ref.current.style.cursor = 'pointer';
      ref.current.style.pointerEvents = 'unset';
    }
  } else {
    if (Object.values(ref)[0] !== null) {
      // return;
      ref.current.style.background = '#8ed0f8';
      ref.current.style.cursor = 'unset';
      ref.current.style.pointerEvents = 'none';
    }
  }
};

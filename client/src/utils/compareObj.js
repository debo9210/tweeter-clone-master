import { useDispatch } from 'react-redux';

export const containsObject = (obj, list) => {
  var i;
  for (i = 0; i < list.length; i++) {
    if (list[i] === obj) {
      return true;
    }
  }

  return false;
};

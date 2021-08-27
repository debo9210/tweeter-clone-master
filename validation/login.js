const Validator = require('validator');
const isEMPTY = require('./isEmpty');

module.exports = validateLoginInput = (data) => {
  const errors = {};

  data.email = !isEMPTY(data.email) ? data.email : '';
  data.password = !isEMPTY(data.password) ? data.password : '';

  if (!Validator.isEmail(data.email)) {
    errors.email = 'Email is invalid';
  }

  if (Validator.isEmpty(data.email)) {
    errors.email = 'Email field is required';
  }

  if (Validator.isEmpty(data.password)) {
    errors.password = 'Password field is required';
  }

  return {
    errors,
    isValid: isEMPTY(errors),
  };
};

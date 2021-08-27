const Validator = require('validator');
const isEMPTY = require('./isEmpty');

module.exports = validateRegisterInput = (data) => {
  const errors = {};

  data.name = !isEMPTY(data.name) ? data.name : '';
  data.email = !isEMPTY(data.email) ? data.email : '';
  data.password = !isEMPTY(data.password) ? data.password : '';
  data.confirmPass = !isEMPTY(data.confirmPass) ? data.confirmPass : '';

  if (!Validator.isLength(data.name, { min: 2, max: 20 })) {
    errors.name = 'Name must be between 2 and 20 characters';
  }

  if (Validator.isEmpty(data.name)) {
    errors.name = 'Name field is required';
  }

  if (!Validator.isEmail(data.email)) {
    errors.email = 'Email is invalid';
  }

  if (Validator.isEmpty(data.email)) {
    errors.email = 'Email field is required';
  }

  if (!Validator.isLength(data.password, { min: 6, max: 30 })) {
    errors.password = 'Password must be between 6 and 30 characters';
  }

  if (Validator.isEmpty(data.password)) {
    errors.password = 'Password field is required';
  }

  if (Validator.isEmpty(data.confirmPass)) {
    errors.confirmPass = 'Confirm password field is required';
  }

  if (!Validator.equals(data.password, data.confirmPass)) {
    errors.confirmPass = 'Password must be identical';
  }

  return {
    errors,
    isValid: isEMPTY(errors),
  };
};

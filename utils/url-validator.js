const validator = require('validator');
const { INVALID_URL_ERR_MSG } = require('./constants');

module.exports = (value, helpers) => {
  if (validator.isURL(value)) {
    return value;
  }

  return helpers.message(INVALID_URL_ERR_MSG);
};

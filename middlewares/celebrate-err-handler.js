const { isCelebrateError } = require('celebrate');
const ValidationError = require('../errors/validation-err');

module.exports = (err, req, res, next) => {
  if (isCelebrateError(err)) {
    const errorData = err.details.get('body')
      || err.details.get('params')
      || err.details.get('headers')
      || err.details.get('cookies');

    const { details: [errorDetails] } = errorData;
    return next(new ValidationError(errorDetails.message));
  }

  return next(err);
};

const { isCelebrateError } = require('celebrate');
const ValidationError = require('../errors/validation-err');
const routeErrMsg = require('../utils/celebrate-err-msg');

module.exports = (err, req, res, next) => {
  if (isCelebrateError(err)) {
    return (req.originalUrl.includes('/movies') && req.method === 'DELETE')
      ? next(new ValidationError(routeErrMsg['/movies'][req.method]))
      : next(new ValidationError(routeErrMsg[req.originalUrl][req.method]));
  }

  return next(err);
};

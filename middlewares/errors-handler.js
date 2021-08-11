const { DEFAULT_ERR_MSG } = require('../utils/constants');

module.exports = (err, req, res, next) => {
  const statusCode = err.statusCode ? err.statusCode : 500;
  const message = statusCode === 500 ? DEFAULT_ERR_MSG : err.message;

  res.status(statusCode).send({ message });
  next();
};

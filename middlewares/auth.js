const jwt = require('jsonwebtoken');

const { NODE_ENV, JWT_SECRET } = process.env;
const { DEFAULT_JWT, AUTH_ERR_MSG, INVALID_TOKEN_ERR_MSG } = require('../utils/constants');
const AuthError = require('../errors/auth-err');

module.exports = (req, res, next) => {
  const token = req.cookies.jwt;

  if (!token) {
    throw new AuthError(AUTH_ERR_MSG);
  }

  let payload = {};

  try {
    payload = jwt.verify(token, NODE_ENV === 'production' ? JWT_SECRET : DEFAULT_JWT);
  } catch (err) {
    throw new AuthError(INVALID_TOKEN_ERR_MSG);
  }

  req.user = payload;
  next();
};

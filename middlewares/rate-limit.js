const rateLimit = require('express-rate-limit');
const { RATE_LIMIT_ERR_MSG } = require('../utils/constants');

module.exports.apiLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 200,
  message: { message: RATE_LIMIT_ERR_MSG },
});

module.exports.signupLimiter = rateLimit({
  windowMs: 60 * 60 * 1000,
  max: 5,
  message: { message: RATE_LIMIT_ERR_MSG },
});

module.exports.signinLimiter = rateLimit({
  windowMs: 5 * 60 * 1000,
  max: 15,
  message: { message: RATE_LIMIT_ERR_MSG },
});

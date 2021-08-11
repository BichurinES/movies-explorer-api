const rateLimit = require('express-rate-limit');

module.exports.apiLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 200,
  message: { message: 'Слишком много запросов, попробуйте повторить позже' },
});

module.exports.signupLimiter = rateLimit({
  windowMs: 60 * 60 * 1000,
  max: 5,
  message: { message: 'Слишком много запросов, попробуйте повторить позже' },
});

module.exports.signinLimiter = rateLimit({
  windowMs: 5 * 60 * 1000,
  max: 15,
  message: { message: 'Слишком много запросов, попробуйте повторить позже' },
});

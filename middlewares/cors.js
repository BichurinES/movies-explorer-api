const { ALLOWED_CORS, DEFAULT_ALLOWED_METHODS } = require('../utils/constants');

module.exports = (req, res, next) => {
  const { method } = req;
  const { origin } = req.headers;
  const reqHeaders = req.headers['Access-Control-Request-Headers'];

  if (ALLOWED_CORS.includes(origin)) {
    res.header('Access-Control-Allow-Origin', origin);
    res.header('Access-Control-Allow-Credentials', true);

    if (method === 'OPTIONS') {
      res.header('Access-Control-Allow-Headers', reqHeaders);
      res.header('Access-Control-Allow-Methods', DEFAULT_ALLOWED_METHODS);
      res.status(200).send();
      return;
    }
  }

  next();
};

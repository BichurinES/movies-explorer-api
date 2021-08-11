const router = require('express').Router();
const NotFoundError = require('../errors/not-found-err');
const { RESOURCE_NOT_FOUND_ERR_MSG } = require('../utils/constants');

router.all('/', (req, res, next) => {
  next(new NotFoundError(RESOURCE_NOT_FOUND_ERR_MSG));
});

module.exports = router;

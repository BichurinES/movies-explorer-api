const router = require('express').Router();
const NotFoundError = require('../errors/not-found-err');

router.all('/', (req, res, next) => {
  next(new NotFoundError('Ресурс не найден'));
});

module.exports = router;

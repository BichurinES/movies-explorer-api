const router = require('express').Router();
const { celebrate, Joi } = require('celebrate');
const { getMyMovies, addMovie, deleteMovie } = require('../controllers/movies');
const { urlPattern } = require('../utils/regex-pattern');

router.get('/', getMyMovies);
router.post('/', celebrate({
  body: Joi.object().keys({
    country: Joi.string().required(),
    director: Joi.string().required(),
    duration: Joi.number().required(),
    year: Joi.string().required().length(4),
    description: Joi.string().required(),
    image: Joi.string().required().regex(urlPattern),
    trailer: Joi.string().required().regex(urlPattern),
    thumbnail: Joi.string().required().regex(urlPattern),
    movieId: Joi.string().required().length(24).hex(),
    nameRU: Joi.string().required(),
    nameEN: Joi.string().required(),
  }),
}), addMovie);
router.delete('/:movieId', celebrate({
  params: Joi.object().keys({
    movieId: Joi.string().required().length(24).hex(),
  }),
}), deleteMovie);

module.exports = router;

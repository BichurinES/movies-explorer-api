const router = require('express').Router();
const { celebrate, Joi } = require('celebrate');
const { getMyMovies, addMovie, deleteMovie } = require('../controllers/movies');
const urlValidator = require('../utils/url-validator');

router.get('/', getMyMovies);
router.post('/', celebrate({
  body: Joi.object().keys({
    country: Joi.string(),
    director: Joi.string().required(),
    duration: Joi.number().required(),
    year: Joi.string().length(4),
    description: Joi.string().required(),
    image: Joi.string().required().custom(urlValidator),
    trailer: Joi.string().required().custom(urlValidator),
    thumbnail: Joi.string().required().custom(urlValidator),
    movieId: Joi.number().required().integer(),
    nameRU: Joi.string().required(),
    nameEN: Joi.string(),
  }),
}), addMovie);
router.delete('/:_id', celebrate({
  params: Joi.object().keys({
    _id: Joi.string().required().length(24).hex(),
  }),
}), deleteMovie);

module.exports = router;

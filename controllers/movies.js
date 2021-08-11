const Movie = require('../models/movie');
const ValidationError = require('../errors/validation-err');
const ConflictError = require('../errors/conflict-err');
const NotAccessError = require('../errors/not-access-err');
const NotFoundError = require('../errors/not-found-err');
const {
  MOVIE_EXISTS_ERR_MSG,
  ADDMOVIE_VALIDATION_ERR_MSG,
  DELETEMOVIE_VALIDATION_ERR_MSG,
  MOVIE_NOT_FOUND_ERR_MSG,
  NOT_ACCESS_ERR_MSG,
} = require('../utils/constants');

module.exports.getMyMovies = (req, res, next) => {
  Movie.find({})
    .populate('owner')
    .then((movies) => res.send(movies))
    .catch(next);
};

module.exports.addMovie = (req, res, next) => {
  req.body.owner = req.user._id;
  Movie.create(req.body)
    .then((movie) => {
      Movie.findById(movie._id)
        .populate('owner')
        .then((createdMovie) => res.send(createdMovie))
        .catch(next);
    })
    .catch((err) => {
      if (err.name === 'MongoError' && err.code === 11000) {
        throw new ConflictError(MOVIE_EXISTS_ERR_MSG);
      } else if (err.name === 'ValidationError') {
        throw new ValidationError(ADDMOVIE_VALIDATION_ERR_MSG);
      } else {
        throw err;
      }
    })
    .catch(next);
};

module.exports.deleteMovie = (req, res, next) => {
  const { movieId } = req.params;
  Movie.findOne({ movieId })
    .orFail(() => new NotFoundError(MOVIE_NOT_FOUND_ERR_MSG))
    .then((movie) => {
      if (movie.owner.toString() !== req.user._id) {
        throw new NotAccessError(NOT_ACCESS_ERR_MSG);
      }
      Movie.findByIdAndRemove(movie._id)
        .orFail(() => new NotFoundError(MOVIE_NOT_FOUND_ERR_MSG))
        .populate('owner')
        .then((removedMovie) => res.send(removedMovie))
        .catch((err) => {
          if (err.name === 'CastError') {
            throw new ValidationError(DELETEMOVIE_VALIDATION_ERR_MSG);
          } else {
            throw err;
          }
        })
        .catch(next);
    })
    .catch((err) => {
      if (err.name === 'CastError' || err.name === 'ValidationError') {
        throw new ValidationError(DELETEMOVIE_VALIDATION_ERR_MSG);
      } else {
        throw err;
      }
    })
    .catch(next);
};

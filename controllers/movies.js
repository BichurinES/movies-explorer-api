const Movie = require('../models/movie');
const ValidationError = require('../errors/validation-err');
const ConflictError = require('../errors/conflict-err');
const NotAccessError = require('../errors/not-access-err');
const NotFoundError = require('../errors/not-found-err');

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
        throw new ConflictError('Фильм уже есть в списке сохраненных');
      } else if (err.name === 'ValidationError') {
        throw new ValidationError('Переданы некорректные данные в методе добавления фильма');
      } else {
        throw err;
      }
    })
    .catch(next);
};

module.exports.deleteMovie = (req, res, next) => {
  const { movieId } = req.params;
  Movie.findOne({ movieId })
    .orFail(() => new NotFoundError('Фильм с таким id не найден'))
    .then((movie) => {
      if (movie.owner.toString() !== req.user._id) {
        throw new NotAccessError('Недостаточно прав на удаление фильма');
      }
      Movie.findByIdAndRemove(movie._id)
        .orFail(() => new NotFoundError('Фильм с таким id не найден'))
        .populate('owner')
        .then((removedMovie) => res.send(removedMovie))
        .catch((err) => {
          if (err.name === 'CastError') {
            throw new ValidationError('Переданы некорректный id в методе удаления фильма');
          } else {
            throw err;
          }
        })
        .catch(next);
    })
    .catch((err) => {
      if (err.name === 'CastError' || err.name === 'ValidationError') {
        throw new ValidationError('Переданы некорректный id в методе удаления фильма');
      } else {
        throw err;
      }
    })
    .catch(next);
};

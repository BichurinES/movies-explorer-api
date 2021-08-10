const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/user');

const { NODE_ENV, JWT_SECRET } = process.env;
const ValidationError = require('../errors/validation-err');
const ConflictError = require('../errors/conflict-err');
const NotFoundError = require('../errors/not-found-err');

module.exports.getAboutMe = (req, res, next) => {
  User.findById(req.user._id)
    .orFail(() => new NotFoundError('Пользователь не найден'))
    .then(({ name, email }) => {
      res.send({ name, email });
    })
    .catch(next);
};

module.exports.editProfile = (req, res, next) => {
  const { name, email } = req.body;

  User.findByIdAndUpdate(
    req.user._id,
    { name, email },
    {
      new: true,
      runValidators: true,
    },
  )
    .orFail(() => new NotFoundError('Пользователь не найден'))
    .then((user) => res.send({ email: user.email, name: user.name }))
    .catch((err) => {
      if (err.name === 'ValidationError') {
        throw new ValidationError('Переданы некорректные данные в методе редактирования профиля');
      } else {
        throw err;
      }
    })
    .catch(next);
};

module.exports.createUser = (req, res, next) => {
  const { email, password, name } = req.body;
  bcrypt.hash(password, 10)
    .then((hash) => {
      User.create({ email, password: hash, name })
        .then((user) => res.send({ email: user.email, name: user.name }))
        .catch((err) => {
          if (err.name === 'MongoError' && err.code === 11000) {
            throw new ConflictError('Пользователь с таким email уже существует');
          } else if (err.name === 'ValidationError') {
            throw new ValidationError('Переданы некорректные данные в методе создания пользователя');
          } else {
            throw err;
          }
        })
        .catch(next);
    })
    .catch(next);
};

module.exports.login = (req, res, next) => {
  const { email, password } = req.body;

  User.findOne({ email })
    .orFail(() => new NotFoundError('Неверные почта или пароль'))
    .select('+password')
    .then((user) => {
      bcrypt.compare(password, user.password)
        .then((matched) => {
          if (!matched) {
            throw new NotFoundError('Неверные почта или пароль');
          }

          const token = jwt.sign({ _id: user._id },
            NODE_ENV === 'production' ? JWT_SECRET : 'dev-secret-key');

          res.cookie('jwt', token, {
            httpOnly: true,
            maxAge: 3600000 * 24 * 7,
            sameSite: true,
          }).send({ message: 'Вход успешно выполнен' });
        })
        .catch(next);
    })
    .catch((err) => {
      if (err.name === 'ValidationError') {
        throw new ValidationError('Переданы некорректные данные в методе входа в профиль');
      } else {
        throw err;
      }
    })
    .catch(next);
};

module.exports.logout = (req, res, next) => {
  try {
    res.clearCookie('jwt').send({ message: 'Выход из пользователя выполнен' });
  } catch (err) {
    next(err);
  }
};

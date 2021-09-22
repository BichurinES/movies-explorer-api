const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/user');

const { NODE_ENV, JWT_SECRET } = process.env;
const {
  DEFAULT_JWT,
  USER_EXISTS_ERR_MSG,
  EDITPROFILE_VALIDATION_ERR_MSG,
  CREATEUSER_VALIDATION_ERR_MSG,
  LOGIN_VALIDATION_ERR_MSG,
  USER_NOT_FOUND_ERR_MSG,
  CREDENTIALS_NOT_FOUND_ERR_MSG,
  LOGIN_MSG,
  LOGOUT_MSG,
} = require('../utils/constants');
const ValidationError = require('../errors/validation-err');
const ConflictError = require('../errors/conflict-err');
const NotFoundError = require('../errors/not-found-err');

module.exports.getAboutMe = (req, res, next) => {
  User.findById(req.user._id)
    .orFail(() => new NotFoundError(USER_NOT_FOUND_ERR_MSG))
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
    .orFail(() => new NotFoundError(USER_NOT_FOUND_ERR_MSG))
    .then((user) => res.send({ email: user.email, name: user.name }))
    .catch((err) => {
      if (err.name === 'MongoError' && err.code === 11000) {
        throw new ConflictError(USER_EXISTS_ERR_MSG);
      } else if (err.name === 'ValidationError') {
        throw new ValidationError(EDITPROFILE_VALIDATION_ERR_MSG);
      } else {
        throw err;
      }
    })
    .catch(next);
};

module.exports.createUser = (req, res, next) => {
  const { email, password, name } = req.body;
  bcrypt.hash(password, 10)
    .then((hash) => User.create({ email, password: hash, name })
      .then((user) => res.send({ email: user.email, name: user.name })))
    .catch((err) => {
      if (err.name === 'MongoError' && err.code === 11000) {
        throw new ConflictError(USER_EXISTS_ERR_MSG);
      } else if (err.name === 'ValidationError') {
        throw new ValidationError(CREATEUSER_VALIDATION_ERR_MSG);
      } else {
        throw err;
      }
    })
    .catch(next);
};

module.exports.login = (req, res, next) => {
  const { email, password } = req.body;

  User.findOne({ email })
    .orFail(() => new NotFoundError(CREDENTIALS_NOT_FOUND_ERR_MSG))
    .select('+password')
    .then((user) => bcrypt.compare(password, user.password)
      .then((matched) => {
        if (!matched) {
          throw new NotFoundError(CREDENTIALS_NOT_FOUND_ERR_MSG);
        }

        const token = jwt.sign({ _id: user._id },
          NODE_ENV === 'production' ? JWT_SECRET : DEFAULT_JWT);

        res.cookie('jwt', token, {
          httpOnly: true,
          maxAge: 3600000 * 24 * 7,
          domain: 'localhost',
        }).send({ message: LOGIN_MSG });
      }))
    .catch((err) => {
      if (err.name === 'ValidationError') {
        throw new ValidationError(LOGIN_VALIDATION_ERR_MSG);
      } else {
        throw err;
      }
    })
    .catch(next);
};

module.exports.logout = (req, res, next) => {
  try {
    res.clearCookie('jwt').send({ message: LOGOUT_MSG });
  } catch (err) {
    next(err);
  }
};

const router = require('express').Router();
const { celebrate, Joi } = require('celebrate');
const auth = require('../middlewares/auth');
const { apiLimiter, signupLimiter, signinLimiter } = require('../middlewares/rate-limit');
const { createUser, login, logout } = require('../controllers/users');

router.use(apiLimiter);
router.post('/signup', signupLimiter, celebrate({
  body: Joi.object().keys({
    email: Joi.string().required().email(),
    password: Joi.string().required().min(8),
    name: Joi.string().required().min(2).max(30),
  }),
}), createUser);
router.post('/signin', signinLimiter, celebrate({
  body: Joi.object().keys({
    email: Joi.string().required().email(),
    password: Joi.string().required(),
  }),
}), login);
router.post('/signout', auth, logout);

router.use('/users', auth, require('./users'));
router.use('/movies', auth, require('./movies'));
router.use('*', auth, require('./others'));

module.exports = router;

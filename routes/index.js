const router = require('express').Router();
const auth = require('../middlewares/auth');
const { createUser, login, logout } = require('../controllers/users');
const { signupValidator, signinValidator } = require('../middlewares/validate-sign-routes');

router.post('/signup', signupValidator, createUser);
router.post('/signin', signinValidator, login);
router.post('/signout', auth, logout);
router.use('/users', auth, require('./users'));
router.use('/movies', auth, require('./movies'));
router.use('*', auth, require('./others'));

module.exports = router;

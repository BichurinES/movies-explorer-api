require('dotenv').config();

const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');

const { PORT = 3000 } = process.env;
const { createUser, login, logout } = require('./controllers/users');
const auth = require('./middlewares/auth');
const { signupValidator, signinValidator } = require('./middlewares/validate-sign-routes');
const errorsHandler = require('./middlewares/errors-handler');
const celebrateErrorsHandler = require('./middlewares/celebrate-err-handler');

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());
app.post('/signup', signupValidator, createUser);
app.post('/signin', signinValidator, login);
app.post('/signout', auth, logout);
app.use('/users', auth, require('./routes/users'));
app.use('/movies', auth, require('./routes/movies'));
app.use('*', auth, require('./routes/others'));

app.use(celebrateErrorsHandler);
app.use(errorsHandler);

mongoose.connect('mongodb://localhost:27017/bitfilmsdb', {
  useNewUrlParser: true,
  useCreateIndex: true,
  useFindAndModify: false,
  useUnifiedTopology: true,
});

app.listen(PORT);

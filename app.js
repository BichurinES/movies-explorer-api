require('dotenv').config();

const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');

const { PORT = 3000 } = process.env;
const errorsHandler = require('./middlewares/errors-handler');
const celebrateErrorsHandler = require('./middlewares/celebrate-err-handler');
const corsHandler = require('./middlewares/cors');
const router = require('./routes');
const { requestLogger, errorLogger } = require('./middlewares/logger');

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(requestLogger);
app.use(corsHandler);
app.use('/', router);

app.use(errorLogger);
app.use(celebrateErrorsHandler);
app.use(errorsHandler);

mongoose.connect('mongodb://localhost:27017/bitfilmsdb', {
  useNewUrlParser: true,
  useCreateIndex: true,
  useFindAndModify: false,
  useUnifiedTopology: true,
});

app.listen(PORT);

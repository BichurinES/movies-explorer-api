require('dotenv').config();

const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const helmet = require('helmet');

const { PORT = 3000, MONGODB_URL, NODE_ENV } = process.env;
const { DEFAULT_MONGODB_URL } = require('./utils/constants');
const errorsHandler = require('./middlewares/errors-handler');
const celebrateErrorsHandler = require('./middlewares/celebrate-err-handler');
const corsHandler = require('./middlewares/cors');
const router = require('./routes');
const { apiLimiter } = require('./middlewares/rate-limit');
const { requestLogger, errorLogger } = require('./middlewares/logger');

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(helmet());
app.use(requestLogger);
app.use(corsHandler);
app.use(apiLimiter);
app.use('/', router);

app.use(errorLogger);
app.use(celebrateErrorsHandler);
app.use(errorsHandler);

mongoose.connect(NODE_ENV === 'production' ? MONGODB_URL : DEFAULT_MONGODB_URL, {
  useNewUrlParser: true,
  useCreateIndex: true,
  useFindAndModify: false,
  useUnifiedTopology: true,
});

app.listen(PORT);

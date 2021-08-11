const mongoose = require('mongoose');
const validator = require('validator');
const { INVALID_EMAIL_ERR_MSG } = require('../utils/constants');

const userSchema = mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: true,
    validate: {
      validator: validator.isEmail,
      message: INVALID_EMAIL_ERR_MSG,
    },
  },
  password: {
    type: String,
    required: true,
    minLength: 8,
    select: false,
  },
  name: {
    type: String,
    required: true,
    minLength: 2,
    maxLength: 30,
  },
});

module.exports = mongoose.model('user', userSchema);

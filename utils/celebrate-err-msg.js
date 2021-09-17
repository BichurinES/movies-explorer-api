const {
  CREATEUSER_VALIDATION_ERR_MSG,
  LOGIN_VALIDATION_ERR_MSG,
  ADDMOVIE_VALIDATION_ERR_MSG,
  DELETEMOVIE_VALIDATION_ERR_MSG,
  EDITPROFILE_VALIDATION_ERR_MSG,
} = require('./constants');

module.exports = {
  '/signup': {
    POST: CREATEUSER_VALIDATION_ERR_MSG,
  },
  '/signin': {
    POST: LOGIN_VALIDATION_ERR_MSG,
  },
  '/movies': {
    POST: ADDMOVIE_VALIDATION_ERR_MSG,
    DELETE: DELETEMOVIE_VALIDATION_ERR_MSG,
  },
  '/users/me': {
    PATCH: EDITPROFILE_VALIDATION_ERR_MSG,
  },
};

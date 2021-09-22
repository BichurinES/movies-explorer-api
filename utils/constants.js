// MongoDB и JWT по умолчанию
module.exports.DEFAULT_MONGODB_URL = 'mongodb://localhost:27017/bitfilmsdb';
module.exports.DEFAULT_JWT = 'dev-secret-key';

// CORS
module.exports.ALLOWED_CORS = [
  'http://127.0.0.1:3000',
  'http://localhost:3000',
];
module.exports.DEFAULT_ALLOWED_METHODS = 'GET,PATCH,POST,DELETE,OPTIONS';

// Error messages
module.exports.MOVIE_EXISTS_ERR_MSG = 'Фильм уже есть в списке сохраненных';
module.exports.USER_EXISTS_ERR_MSG = 'Пользователь с таким email уже существует';
module.exports.ADDMOVIE_VALIDATION_ERR_MSG = 'Переданы некорректные данные в методе добавления фильма';
module.exports.DELETEMOVIE_VALIDATION_ERR_MSG = 'Переданы некорректный id в методе удаления фильма';
module.exports.EDITPROFILE_VALIDATION_ERR_MSG = 'Переданы некорректные данные в методе редактирования профиля';
module.exports.CREATEUSER_VALIDATION_ERR_MSG = 'Переданы некорректные данные в методе создания пользователя';
module.exports.LOGIN_VALIDATION_ERR_MSG = 'Переданы некорректные данные в методе входа в профиль';
module.exports.MOVIE_NOT_FOUND_ERR_MSG = 'Фильм с таким id не найден';
module.exports.USER_NOT_FOUND_ERR_MSG = 'Пользователь не найден';
module.exports.CREDENTIALS_NOT_FOUND_ERR_MSG = 'Неверные почта или пароль';
module.exports.RESOURCE_NOT_FOUND_ERR_MSG = 'Ресурс не найден';
module.exports.NOT_ACCESS_ERR_MSG = 'Недостаточно прав на удаление фильма';
module.exports.AUTH_ERR_MSG = 'Необходима авторизация';
module.exports.INVALID_TOKEN_ERR_MSG = 'Переданный токен некорректен';
module.exports.RATE_LIMIT_ERR_MSG = 'Слишком много запросов, попробуйте повторить позже';
module.exports.INVALID_URL_ERR_MSG = 'Неверный формат URL-адреса';
module.exports.INVALID_EMAIL_ERR_MSG = 'Неверный формат email-адреса';
module.exports.DEFAULT_ERR_MSG = 'Ошибка сервера';

// Success messages
module.exports.LOGIN_MSG = 'Вход успешно выполнен';
module.exports.LOGOUT_MSG = 'Выход из пользователя выполнен';

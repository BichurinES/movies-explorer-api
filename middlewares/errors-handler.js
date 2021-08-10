module.exports = (err, req, res, next) => {
  //User.schema.obj.hasOwnProperty('name');
  const statusCode = err.statusCode ? err.statusCode : 500;
  const message = statusCode === 500 ? 'Ошибка сервера' : err.message;

  res.status(statusCode).send({ message });
  next();
};

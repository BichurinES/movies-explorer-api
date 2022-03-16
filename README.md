# Проект - MovieLike - Backend-часть

## Описание проекта
Проект представляет собой сервис по поиску и сохранению своих любимых фильмов.

URL backend-части проекта: **https://api.mestogram.nomoredomains.monster**
Ссылка на frontend-часть проекта: **https://movielike.nomoredomains.club/**

## Используемые технологии:
![](https://img.shields.io/badge/Backend-Node.js-informational?style=flat&logo=node.js&logoColor=white&color=2bbc8a)
![](https://img.shields.io/badge/Framework-Express.js-informational?style=flat&logo=node.js&logoColor=white&color=2bbc8a)
![](https://img.shields.io/badge/Database-MongoDB-informational?style=flat&logo=MongoDB&logoColor=white&color=2bbc8a)
![](https://img.shields.io/badge/Data%20model-Mongoose-informational?style=flat&logo=MongoDB&logoColor=white&color=2bbc8a)
![](https://img.shields.io/badge/Validation-Celebrate-informational?style=flat&logo=C&logoColor=white&color=2bbc8a)


__BACKEND__
* __Express__
  * Прописана логика сервера для работы с регистрацией и входа по логину и паролю
  * Реализована логика обработки CORS-запросов
  * Автоматическая проверка введенных данных на корректность через библиотеку celebrate
  * Единый центр обработки всех ошибок
  * Добавление, удаление любимых фильмов, получение списка любимых фильмов
  * Редактирование профиля пользователя
  * Модели и связка с базой данных MongoDB
  * Защита от DDos атак через библиотеку Helmet

## API
* __Routes:__
  * GET /users/me - возвращает информацию о пользователе (email и имя);
  * PATCH /users/me - обновляет информацию о пользователе (email и имя);
  * GET /movies - возвращает все сохранённые пользователем фильмы;
  * POST /movies - создаёт фильм с переданными в теле country, director, duration, year, description, image, trailer, nameRU, nameEN и thumbnail, movieId;
  * DELETE /movies/movieId - удаляет сохранённый фильм по id. Пользователь может удалять только свои фильмы;
  * POST /signup - создаёт пользователя с переданными в теле email, password и name;
  * POST /signin - проверяет переданные в теле почту и пароль и возвращает JWT;
  * POST /signout - выход пользователя из системы и удаляет JWT из куков;

## Команды

### `npm run dev`

Запуск приложения в режиме разработки.<br/>
URL в режиме разработки: [http://localhost:3000](http://localhost:3000).

### `npm run start`

Запуск сервера в режиме production.

### `npm run lint`

Проверка проекта линтером.

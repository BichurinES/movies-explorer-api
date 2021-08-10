const router = require('express').Router();
const { getMyMovies, addMovie, deleteMovie } = require('../controllers/movies');

router.get('/', getMyMovies);
router.post('/', addMovie);
router.delete('/:movieId', deleteMovie);

module.exports = router;

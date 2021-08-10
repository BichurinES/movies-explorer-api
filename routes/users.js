const router = require('express').Router();
const { getAboutMe, editProfile } = require('../controllers/users');

router.get('/me', getAboutMe);
router.patch('/me', editProfile);

module.exports = router;

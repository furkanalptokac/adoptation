const UserController = require('../controllers/UserController');
const router = require('express').Router();

router.post('/signup', UserController.signup);

module.exports = router;
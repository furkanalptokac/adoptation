const router = require('express').Router();
const authController = require('../../controllers/authController');
const auth = require('../../middleware/auth');
const validator = require('../../controllers/validator');

router.get('/', auth, authController.register);

router.post('/', validator.login, authController.login);

module.exports = router;
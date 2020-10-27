const UserController = require('../controllers/UserController');
const router = require('express').Router();

router.post('/signup', UserController.signup);

router.get('/getuser', UserController.findFromEmail);

router.delete('/deleteuser', UserController.deleteFromEmail);

module.exports = router;
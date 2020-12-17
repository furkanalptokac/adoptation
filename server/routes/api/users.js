const UserController = require('../../controllers/UserController');
const router = require('express').Router();
const { check, validationResult } = require('express-validator/check');

router.post('/signup', UserController.signup);

router.get('/finduser', UserController.findFromEmail);

router.get('/getallusers', UserController.findAllUsers);

router.get('/findfromid/:id', UserController.findFromId);

router.put('/updateuser/:id', UserController.updateUser);

router.put('/updatepassword/:id', UserController.updatePassword);

router.delete('/deleteuser', UserController.deleteFromEmail);

module.exports = router;
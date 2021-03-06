const router = require('express').Router();
const UserController = require('../../controllers/UserController');
const validator = require('../../controllers/validator');

router.post('/signup', validator.register, UserController.signup);

router.get('/finduser', UserController.findFromEmail);

router.get('/getallusers', UserController.findAllUsers);

router.get('/findfromid/:id', UserController.findFromId);

router.post('/followpost/:id', UserController.followPost);

router.put('/updateuser/:id', UserController.updateUser);

router.put('/updatepassword/:id', UserController.updatePassword);

router.put('/forgotpassword/:id', UserController.forgotPassword);

router.delete('/deleteuser', UserController.deleteFromEmail);

router.delete('/deletefromid/:id', UserController.deleteFromId);

module.exports = router;
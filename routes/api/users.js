const UserController = require('../../controllers/UserController');
const router = require('express').Router();

router.post('/signup', UserController.signup);

router.get('/finduser', UserController.findFromEmail);

router.get('/getallusers', UserController.findAllUsers);

router.get('/findfromid/:id', UserController.findFromId);

router.put('/updateuser/:id', UserController.updateUser);

router.put('/updatepassword/:id', UserController.updatePassword);

router.put('/forgotpassword/:id', UserController.forgotPassword);

router.delete('/deleteuser', UserController.deleteFromEmail);

router.delete('/deletefromid/:id', UserController.deleteFromId);

module.exports = router;
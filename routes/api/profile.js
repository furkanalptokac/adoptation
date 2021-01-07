const router = require('express').Router();
const auth = require('../../controllers/auth');
const ProfileController = require('../../controllers/ProfileController');

router.get('/me', auth, profileController);
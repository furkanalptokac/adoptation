const router = require('express').Router();
const Controller = require('../controllers/controller');

router.get('/', Controller.index);

router.post('/test', Controller.test);

module.exports = router;
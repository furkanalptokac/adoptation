const PostController = require('../controllers/PostController');
const router = require('express').Router();

router.post('/createpost', PostController.createPost);

module.exports = router;
const PostController = require('../../controllers/PostController');
const router = require('express').Router();

router.post('/newpost', PostController.createPost);

router.get('/getallposts', PostController.getAllPosts);

module.exports = router;
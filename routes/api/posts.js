const PostController = require('../../controllers/PostController');
const router = require('express').Router();

router.post('/createpost', PostController.createPost);

router.get('/getallposts', PostController.getAllPosts);

router.get('/getpostfromid/:id', PostController.getPostFromId);

router.put('/updatepost/:id', PostController.updatePost);

router.delete('/deletepost/:id', PostController.deletePost);

module.exports = router;
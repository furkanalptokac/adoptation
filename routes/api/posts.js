const PostController = require('../../controllers/PostController');
const { Post } = require('../../models/Post')
const router = require('express').Router();
const auth = require('../../middleware/auth');
const validator = require('../../controllers/validator');
const checkObjectId = require('../../middleware/checkObjectId');

router.post('/', auth, PostController.createPost);

router.get('/', auth, PostController.getAllPosts);

router.get('/:id', auth, checkObjectId('id'), async (req, res) => {
    try {
        const post = await Post.findById(req.params.id);
    
        if (!post) {
          return res.status(404).json({ msg: 'İlan bulunamadı.' });
        }
    
        res.json(post);
      } catch (err) {
        console.error(err.message);
    
        res.status(500).send('Server Error');
      }
});

router.put('/updatepost/:id', PostController.updatePost);

router.delete('/deletepost/:id', PostController.deletePost);

module.exports = router;
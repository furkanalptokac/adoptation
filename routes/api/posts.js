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

router.put('/like/:id', auth, checkObjectId('id'), async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);

    if (post.likes.some((like) => like.user.toString() === req.user.id)) {
      return res.status(400).json({ msg: 'Gönderi zaten beğenilmiş.' });
    }

    post.likes.unshift({ user: req.user.id });

    await post.save();
    
    return res.json(post.likes)
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error.');
  }
})

router.put('/unlike/:id', auth, checkObjectId('id'), async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);

    if (!post.likes.some((like) => like.user.toString() === req.user.id)) {
      return res.status(400).json({ msg: 'Post has not yet been liked' });
    }

    post.likes = post.likes.filter(
      ({ user }) => user.toString() !== req.user.id
    );

    await post.save();

    return res.json(post.likes);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

router.put('/updatepost/:id', PostController.updatePost);

router.delete('/:id', auth, checkObjectId('id'), async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);

    if (!post) {
      return res.status(404).json({ msg: 'Post not found' });
    }

    if (post.user.toString() !== req.user.id) {
      return res.status(401).json({ msg: 'User not authorized' });
    }

    await post.remove();

    res.json({ msg: 'Post removed' });
  } catch (err) {
    console.error(err.message);

    res.status(500).send('Server Error');
  }
});

module.exports = router;
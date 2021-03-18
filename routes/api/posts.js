const { check, validationResult } = require('express-validator');
const PostController = require('../../controllers/PostController');
const { Post } = require('../../models/Post')
const { User } = require('../../models/User')
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

router.post('/comment/:id', auth, checkObjectId('id'), check('text', 'Yorum içeriği zorunludur.').notEmpty(), async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    
    try {
      const user = await User.findById(req.user.id).select('-password');
      const post = await Post.findById(req.params.id);

      const newComment = {
        text: req.body.text,
        name: user.name,
        avatar: user.avatar,
        user: req.user.id
      };

      post.comments.unshift(newComment);

      await post.save();

      res.json(post.comments);
    } catch (err) {
      console.error(err.message);
      res.status(500).send('Server error');
    }
  }
);

router.delete('/comment/:id/:comment_id', auth, async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);

    const comment = post.comments.find(
      (comment) => comment.id === req.params.comment_id
    );

    if (!comment) {
      return res.status(404).json({ msg: 'Yorum bulunamadı' });
    }

    if (comment.user.toString() !== req.user.id) {
      return res.status(401).json({ msg: 'User not authorized' });
    }

    post.comments = post.comments.filter(
      ({ id }) => id !== req.params.comment_id
    );

    await post.save();

    return res.json(post.comments);
  } catch (err) {
    console.error(err.message);
    return res.status(500).send('Server error');
  }
});

module.exports = router;
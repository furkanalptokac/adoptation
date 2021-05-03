const { Post } = require('../models/Post');
const { User } = require('../models/User');
const { validationResult } = require('express-validator');

exports.createPost = async (req, res) => {
    const errors = validationResult(req);

    if (!errors.isEmpty())
        return res.status(400).json({ error: errors.array()});

    try {
        const user = await User.findById(req.user.id).select('-password');

        if (req.body.category === null) {
            return res.status(400).send('Kategori boş olamaz.');
        }

        const newPost = new Post({
            title: req.body.title,
            text: req.body.text,
            name: user.name,
            category: req.body.category,
            avatar: user.avatar,
            user: req.user.id,
            longitude: req.body.longitude,
            latitude: req.body.latitude
        });

        const post = await newPost.save();

        res.json(post);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error.');
    }
}

exports.getAllPosts = async (req, res) => {
    try {
        const posts = await Post.find().sort({ date: -1 })
        res.json(posts)
    } catch (err) {
        console.error(err.message)
        res.status(500).send('Server error')
    }
}

exports.getPostFromId = async (req, res) => {
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
}

exports.followPost = async (req, res) => {
    try {
        const user = await User.findById(req.params.id);
    
        if (user.favorites.some(post => post._id.toString() === req.body.postId)) {
            return res.status(400).json({ msg: 'Gönderi zaten takip edilmiş.' });
        }
    
        user.favorites.unshift({ _id: req.body.postId });
    
        await user.save();
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error.');
    }
}

exports.likePost = async (req, res) => {
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
}

exports.unlikePost = async (req, res) => {
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
}

exports.deletePost = async (req, res) => {
    try {
        const post = await Post.findById(req.params.id);

        if (!post) {
            return res.status(404).json({ msg: 'Gönderi bulunamadı' });
        }

        if (post.user.toString() !== req.user.id) {
            return res.status(401).json({ msg: 'User not authorized' });
        }

        await post.remove();

        res.json({ msg: 'İlan kaldırıldı.' });
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
}

exports.postComment = async (req, res) => {
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

exports.deleteComment = async (req, res) => {
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
}
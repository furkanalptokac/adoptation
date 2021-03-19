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
    await Post.findById(req.params.id, function (err, post) {
        if (err) {
            res.send(err);
        } else {
            res.send(post);
        }
    })
}

exports.updatePost = async (req, res) => {
    await Post.findByIdAndUpdate(req.params.id, {
        title: req.body.title,
        description: req.body.description
    }, function (err, result) {
        if (err) {
            res.send(err);
        } else {
            res.send(result);
        }
    });
}

exports.deletePost = async (req, res) => {
    await Post.deleteOne({
        _id: req.params.id
    })
    .then(() => {
        res.json({
            result: 'Post deleted'
        })
    })
    .catch(err => {
        res.send(err);
    })
}
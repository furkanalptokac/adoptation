const { Post } = require('../models/Post');

exports.createPost = async (req, res) => {
    let post = new Post({
        title: req.body.title,
        description: req.body.description,
        category: req.body.category
    });

    await post.save();
    res.send(post);
}

exports.getAllPosts = async (req, res) => {
    await Post.find({}, function (err, posts) {
        var postMap = {};

        posts.forEach(function (post) {
            postMap[post._id] = post;
        });

        res.send(postMap);
    });
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
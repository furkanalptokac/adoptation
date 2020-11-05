const { Post } = require('../models/Post');

exports.createPost = async (req, res) => {
    let post = new Post({
        title: req.body.title,
        description: req.body.description
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
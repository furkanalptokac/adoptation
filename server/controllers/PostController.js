const { Post } = require('../models/Post');

exports.createPost = async (req, res) => {
    let post = new Post({
        title: req.body.title,
        description: req.body.description
    });

    await post.save();
    res.send(post);
}
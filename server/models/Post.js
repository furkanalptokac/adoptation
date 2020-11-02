const mongoose = require('mongoose');

var date = new Date();
date.setHours(date.getHours() + 3);

const Post = mongoose.model('Post', new mongoose.Schema({
    title: {
        type: String,
        required: true,
        minlength: 2,
        maxlength: 100
    },
    description: {
        type: String,
        required: true,
        minlength: 2,
        maxlength: 300
    }
}, { timestamps: { currentTime: () => date } }));

exports.Post = Post;
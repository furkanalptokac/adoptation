const mongoose = require('mongoose');
const Schema = mongoose.Schema;

var date = new Date();
date.setHours(date.getHours() + 3);

const Post = mongoose.model('Post', new mongoose.Schema({
    user: {
        type: Schema.Types.ObjectId
    },
    text: {
        type: String,
        required: true
    },
    name: {
        type: String,
        required: true
    },
    avatar: {
        type: String
    },
    likes: [
        {
            user: {
                type: Schema.Types.ObjectId
            }
        }
    ],
    comments: [
        {
            user: {
                type: Schema.Types.ObjectId
            },
            text: {
                type: String,
                required: true
            },
            name: {
                type: String
            },
            avatar: {
                type: String
            },
        }, { timestamps: { currentTime: () =>  date } }
    ],
}, { timestamps: { currentTime: () =>  date } }))

exports.Post = Post;
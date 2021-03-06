const mongoose = require('mongoose');

var date = new Date();
date.setHours(date.getHours() + 3);

const User = mongoose.model('User', new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    surname: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        unique: true,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    avatar: {
        type: String
    },
    posts: {
        type: Array,
        default: []
    }
}, { timestamps: { currentTime: () =>  date } }));

exports.User = User;
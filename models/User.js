const mongoose = require('mongoose');

var date = new Date();
date.setHours(date.getHours() + 3);

const User = mongoose.model('User', new mongoose.Schema({
    name: {
        type: String,
        required: true,
        minlength: 2,
        maxlength: 50,
        required: true
    },
    surname: {
        type: String,
        required: true,
        minlength: 2,
        maxlength: 50,
        required: true
    },
    email: {
        type: String,
        required: true,
        minlength: 5,
        maxlength: 255,
        unique: true,
        required: true
    },
    password: {
        type: String,
        required: true,
        minlength: 6,
        maxlength: 100,
        required: true
    },
    city: {
        type: String,
        required: true
    },
    avatar: {
        type: String
    }
    /*
    date: {
        type: Date,
        default: Date.now
    }
    */
}, { timestamps: { currentTime: () =>  date } }));

exports.User = User;
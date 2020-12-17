const mongoose = require('mongoose');

var date = new Date();
date.setHours(date.getHours() + 3);

const User = mongoose.model('User', new mongoose.Schema({
    name: {
        type: String,
        required: true,
        minlength: 2,
        maxlength: 50
    },
    surname: {
        type: String,
        required: true,
        minlength: 2,
        maxlength: 50
    },
    email: {
        type: String,
        required: true,
        minlength: 5,
        maxlength: 255,
        unique: true
    },
    password: {
        type: String,
        required: true,
        minlength: 1,
        maxlength: 7000
    },
    bio: {
        type: String,
        required: false,
        minlength: 2,
        maxlength: 100
    },
    city: {
        type: String
    },
    /*
    date: {
        type: Date,
        default: Date.now
    }
    */
}, { timestamps: { currentTime: () =>  date } }));

exports.User = User;
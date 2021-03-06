const mongoose = require('mongoose');

var date = new Date();
date.setHours(date.getHours() + 3);

const ProfileSchema = mongoose.model('Profile', new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    location: {
        type: String,
        required: true
    },
    bio: {
        type: String,
        required: true
    },
    social: {
        twitter: {
            type: String,
        },
        facebook: {
            type: String,
        },
        instagram: {
            type: String,
        }
    },
}, { timestamps: { currentTime: () =>  date } }));

exports.Profile = ProfileSchema;
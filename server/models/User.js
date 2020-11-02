const mongoose = require('mongoose');
const Joi = require('joi');

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
        minlength: 4,
        maxlength: 1024
    },
    bio: {
        type: String,
        required: false,
        minlength: 2,
        maxlength: 100
    },
    city: String

}, { timestamps: { currentTime: () =>  date } }));
/*
function validateUser(User) {
    const schema = Joi.object({
        name: Joi.string().min(5).max(50).required(),
        surname: Joi.string().min(5).max(50).required(),
        email: Joi.string().min(5).max(255).required().email(),
        password: Joi.string().min(5).max(1024).required(),
        bio: Joi.string().min(5).max(100),

    });

    return schema.validate(User, schema);
}
exports.validate = validateUser;
*/
exports.User = User;
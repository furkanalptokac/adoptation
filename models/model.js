const mongoose = require('mongoose');

const Schema = mongoose.Schema({
    test: String
}, {
    timestamps: true
});

module.exports = mongoose.model('Model', Schema);
const mongoose = require('mongoose');

var date = new Date();
date.setHours(date.getHours() + 3);

const ReportSchema = mongoose.model('Report', new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    report: {
        type: String,
        required: true
    },
}, { timestamps: { currentTime: () => date } }));

exports.Report = ReportSchema;
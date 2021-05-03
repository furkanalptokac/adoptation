const mongoose = require('mongoose');

var date = new Date();
date.setHours(date.getHours() + 3);

const ReportSchema = mongoose.model('Report', new mongoose.Schema({
    reportId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    report: {
        type: String,
        required: true
    },
    name: {
        type: String,
    },
    surname: {
        type: String,
    },
}, { timestamps: { currentTime: () => date } }));

exports.Report = ReportSchema;
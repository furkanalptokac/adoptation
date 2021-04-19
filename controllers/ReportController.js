const { Report } = require('../models/Report');

exports.report = async (req, res) => {
    const newReport = new Report({
        user: req.user.id,
        report: req.body.report
    });

    const report = await newReport.save();

    res.json(report);
};
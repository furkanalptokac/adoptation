const { Report } = require('../models/Report');
const { User } = require('../models/User');

exports.report = async (req, res) => {
  try {
    const user = await User.findById(req.user.id)

    const newReport = new Report({
      reportId: req.user.id,
      name: user.name,
      surname: user.surname,
      report: req.body.report,
    });

    const report = await newReport.save();

    res.json(report);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
};

exports.getReports = async (req, res) => {
  try {
    const reports = await Report.find();
    res.json(reports)
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
}
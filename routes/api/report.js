const router = require('express').Router();
const auth = require('../../middleware/auth');
const ReportController = require('../../controllers/ReportController');

router.post('/', auth, ReportController.report);

module.exports = router;
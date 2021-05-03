const router = require('express').Router();
const auth = require('../../middleware/auth');
const ReportController = require('../../controllers/ReportController');
/** 
 * @api {post} /api/report/
 * @apiName Report
 * @apiGroup Report
 * @apiParam {User} Authenticated user
 * @apiParam {String} Report body
 */
router.post('/', auth, ReportController.report);

router.get('/', auth, ReportController.getReports);

module.exports = router;

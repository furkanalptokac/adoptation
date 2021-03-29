const router = require('express').Router();
const authController = require('../../controllers/authController');
const auth = require('../../middleware/auth');
const validator = require('../../controllers/validator');

/** 
 * @api {get} /api/auth Get user by token
 * @apiName Get User
 * @apiGroup Auth
 * @apiParam {String} User's Token
 */
router.get('/', auth, authController.getUser);

/** 
 * @api {post} /api/auth Authenticate user & Get token
 * @apiName Login
 * @apiGroup Auth
 * @apiParam {String} Email
 * @apiParam {String} Password
 */
router.post('/', validator.login, authController.login);

module.exports = router;
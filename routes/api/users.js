const router = require('express').Router();
const UserController = require('../../controllers/UserController');
const validator = require('../../controllers/validator');

/** 
 * @api {post} /api/posts/signup Sign up
 * @apiName Sign up
 * @apiGroup User
 * @apiParam {String} Name
 * @apiParam {String} Surname
 * @apiParam {String} Email
 * @apiParam {String} Password
 */
router.post('/signup', validator.register, UserController.signup);

/** 
 * @api {put} /api/posts/updatepassword/:id Update password
 * @apiName Update password
 * @apiGroup User
 * @apiParam {id} User id
 * @apiParam {String} Password
 */
router.put('/updatepassword/:id', UserController.updatePassword);

/** 
 * @api {put} /api/posts/forgotpassword Reset password
 * @apiName Reset password
 * @apiGroup User
 * @apiParam {id} User id
 * @apiParam {String} Password
 */
router.put('/forgotpassword', UserController.forgotPassword);

module.exports = router;
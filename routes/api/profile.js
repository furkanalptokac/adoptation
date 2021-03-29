const router = require('express').Router();
const auth = require('../../middleware/auth');
const ProfileController = require('../../controllers/ProfileController');
const validator = require('../../controllers/validator');
const checkObjectId = require('../../middleware/checkObjectId');
const { Profile } = require('../../models/Profile');

/** 
 * @api {post} /api/profile/ Post profile
 * @apiName Post profile
 * @apiGroup Profile
 * @apiParam {String} Location
 * @apiParam {String} Bio
 * @apiParam {String} Facebook URL
 * @apiParam {String} Twitter URL
 * @apiParam {String} Instagram URL
 */
router.post('/', auth, validator.profilePost, ProfileController.postProfile);

/** 
 * @api {get} /api/profile/me Get profile
 * @apiName Get profile
 * @apiGroup Profile
 * @apiParam {User} Authenticated user 
 */
router.get('/me', auth, ProfileController.getProfile);

/** 
 * @api {get} /api/profile/me Get all profiles
 * @apiName Get all profiles
 * @apiGroup Profile 
 */
router.get('/', ProfileController.getAllProfiles);

/** 
 * @api {get} /api/profile/user/:id Get user's profile from id
 * @apiName Get user's profile from id
 * @apiGroup Profile
 * @apiParam {id} User id
 */
router.get('/user/:user_id', checkObjectId('user_id'), ProfileController.getProfileFromId);

/** 
 * @api {delete} /api/profile/ Delete user
 * @apiName Delete user
 * @apiGroup Profile
 * @apiParam {User} Authenticated user
 */
router.delete('/', auth, ProfileController.deleteUser);

/** 
 * @api {delete} /api/profile/ Remove user
 * @apiName Remove user
 * @apiGroup Profile
 * @apiParam {id} User id
 */
router.delete('/:id', auth, ProfileController.removeUser);

module.exports = router;
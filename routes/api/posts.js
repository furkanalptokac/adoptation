const { check, validationResult } = require('express-validator');
const PostController = require('../../controllers/PostController');
const { Post } = require('../../models/Post')
const { User } = require('../../models/User')
const router = require('express').Router();
const auth = require('../../middleware/auth');
const validator = require('../../controllers/validator');
const checkObjectId = require('../../middleware/checkObjectId');

/** 
 * @api {post} /api/posts Create post
 * @apiName Create post
 * @apiGroup Posts
 * @apiParam {String} Title
 * @apiParam {String} Text
 * @apiParam {String} User's name
 * @apiParam {String} Category
 * @apiParam {String} Grvatar link
 * @apiParam {id} User id
 */
router.post('/', auth, PostController.createPost);

/** 
 * @api {get} /api/posts Get all posts
 * @apiName Get all posts
 * @apiGroup Posts
 */
router.get('/', auth, PostController.getAllPosts);

/** 
 * @api {get} /api/posts/:id Get post from id
 * @apiName Get post from id
 * @apiGroup Posts
 * @apiParam {id} Post id
 */
router.get('/:id', auth, checkObjectId('id'), PostController.getPostFromId);

/** 
 * @api {put} /api/posts/follow/:id Follow post
 * @apiName Follow post
 * @apiGroup Posts
 * @apiParam {id} User id
 * @apiParam {id} Post id
 */
router.put('/follow/:id', auth, checkObjectId('id'), PostController.followPost);

/** 
 * @api {put} /api/posts/like/:id Like post
 * @apiName Like post
 * @apiGroup Posts
 * @apiParam {id} User id
 * @apiParam {id} Post id
 */
router.put('/like/:id', auth, checkObjectId('id'), PostController.likePost);

/** 
 * @api {put} /api/posts/unlike/:id Unlike post
 * @apiName Unlike post
 * @apiGroup Posts
 * @apiParam {id} User id
 * @apiParam {id} Post id
 */
router.put('/unlike/:id', auth, checkObjectId('id'), PostController.unlikePost);

/** 
 * @api {delete} /api/posts/:id Delete post
 * @apiName Delete post
 * @apiGroup Posts
 * @apiParam {id} Post id
 */
router.delete('/:id', auth, checkObjectId('id'), PostController.deletePost);

/** 
 * @api {post} /api/posts/comment/:id Post comment
 * @apiName Post comment
 * @apiGroup Posts
 * @apiParam {id} User id
 * @apiParam {id} Post id
 * @apiParam {String} text
 */
router.post('/comment/:id', auth, checkObjectId('id'), validator.postComment, PostController.postComment);

/** 
 * @api {delete} /api/posts/comment/:id Delete comment
 * @apiName Post comment
 * @apiGroup Posts
 * @apiParam {id} Post id
 * @apiParam {id} Comment id
 */
router.delete('/comment/:id/:comment_id', auth, PostController.deleteComment);

module.exports = router;
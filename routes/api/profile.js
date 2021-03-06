const router = require('express').Router();
const auth = require('../../middleware/auth');
const ProfileController = require('../../controllers/ProfileController');
const validator = require('../../controllers/validator');
const checkObjectId = require('../../middleware/checkObjectId');

router.get('/me', auth, ProfileController.getProfile);

router.post('/', auth, validator.profilePost, ProfileController.postProfile);

router.get('/', ProfileController.getAllProfiles);

router.get('/user/:user_id', checkObjectId('user_id'), async ({ params: { user_id } }, res) => {
    try {
        const profile = await Profile.findOne({
            user: user_id
        }).populate('user', ['name', 'avatar']);

        if (!profile)
            return res.status(400).json({ msg: 'Profile not found '});
        
        res.json(profile);
    } catch (err) {
        console.error(err.message);
        return res.status(500).json({ msg: 'Server error' });
    }
});

router.delete('/', auth, ProfileController.delete);

module.exports = router;
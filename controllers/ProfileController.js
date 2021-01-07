const Profile = require('../../controllers/Profile');
const User = require('../../controllers/User');
const Post = require('../../controllers/Post');

exports.getProfile = async (req, res) => {
    try {
        const profile = await Profile.findOne({
            user: req.user.id
        }).populate('user', ['name', 'avatar']);

        if (!profile) {
            return res.status(400).json({ msg: 'Bu kullanici icin profil bulunmamakta.' });
        }

        res.json(profile);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error.');
    }
};
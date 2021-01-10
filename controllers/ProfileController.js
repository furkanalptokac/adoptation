const Profile = require('../../controllers/Profile');
const User = require('../../controllers/User');
const Post = require('../../controllers/Post');
const { validationResult } = require('express-validator');

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

exports.postProfile = async (req, res) => {
    const errors = validationResult();
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    const {
        twitter,
        instagram,
        facebook,
        ...rest
    } = req.body;

    const socialFields = { twitter, instagram, facebook };
    for (const [key, value] of Object.entries(socialFields)) {
        if (value && value.length > 0)
            socialFields[key] = normalize(value, { forceHttps: true });
    }

    profileFields.social = socialFields;

    try {
        let profile = await Profile.findOneAndUpdate(
            { user: req. user.id },
            { $set: profileFields },
            { new: true, upsert: true, setDefaultsOnInsert: true }
        );

        return res.json(profile);
    } catch (err) {
        console.error(err.message);
        return res.status(500).send('Server error.');
    }
};

exports.getAllProfiles = async (req, res) => {
    try {
        const profiles = await Profile.find().populate('user', ['name', 'avatar']);
        res.json(profiles);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
};

exports.delete = async (req, res) => {
    try {
        await Promise.all([
            Post.deleteMany({ user: req.user.id }),
            Profile.findOneAndRemove({ user: req.user.id}),
            User.findOneAndRemove({ _id: req.user.id })
        ]);

        res.json({ msg: 'User deleted' });
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error.');
    }
}
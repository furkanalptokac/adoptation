const { Profile } = require('../models/Profile');
const { User } = require('../models/User');
const { Post } = require('../models/Post');
const { validationResult } = require('express-validator');
const normalize = require('normalize-url');

exports.postProfile = async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    const {
        twitter,
        instagram,
        facebook,
        ...rest
    } = req.body;

    const profileFields = {
        user: req.user.id,
        ...rest
    };

    const socialFields = { twitter, instagram, facebook };

    for (const [key, value] of Object.entries(socialFields)) {
        if (value && value.length > 0)
            socialFields[key] = normalize(value, { forceHttps: true });
    }

    profileFields.social = socialFields;

    try {
        let profile = await Profile.findOneAndUpdate(
            { user: req.user.id },
            { $set: profileFields },
            { new: true, upsert: true, setDefaultsOnInsert: true }
        );

        return res.json(profile);
    } catch (err) {
        console.error(err.message);
        return res.status(500).send('Server error.');
    }
};

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

exports.getAllProfiles = async (req, res) => {
    try {
        const profiles = await Profile.find().populate('user', ['name', 'avatar']);
        res.json(profiles);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
};

exports.getProfileFromId = async ({ params: { user_id } }, res) => {
    try {
        const profile = await Profile.findOne({
            user: user_id
        }).populate('user', ['name', 'avatar']);

        if (!profile)
            return res.status(400).json({ msg: 'Profil bulunamadı. '});
        
        res.json(profile);
    } catch (err) {
        console.error(err.message);
        return res.status(500).json({ msg: 'Server error' });
    }
}

exports.deleteUser = async (req, res) => {
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

exports.removeUser = async (req, res) => {
    try {
        await Promise.all([
            Post.deleteMany({ user: req.params.id }),
            Profile.findOneAndRemove({ user: req.params.id}),
            User.findOneAndRemove({ _id: req.params.id })
        ]);

        res.json({ msg: 'User removed.' });
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error.');
    }
}
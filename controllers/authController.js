const { User } = require('../models/User');

exports.validate = async (req, res) => {
    try {
        const user = await User.findById(req.user.id).select('-password');
        res.json(user);
    } catch (err) {
        console.err(err.message);
        res.status(500).send('Server error.');
    }
}
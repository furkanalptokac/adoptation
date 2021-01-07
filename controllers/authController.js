const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const config = require('../config/config');
const { User } = require('../models/User');
const { validationResult } = require('express-validator');

exports.register = async (req, res) => {
    try {
        const user = await User.findById(req.user.id).select('-password');
        res.json(user);
    } catch (err) {
        console.err(err.message);
        res.status(500).send('Server error.');
    }
}

exports.login = async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    const { email, password } = req.body;

    try {
        let user = await User.findOne({ email });
        console.log(user)
        if (!user) {
            return res.status(400).json({ errors: [{ msg: 'Bir seyler ters gitti.' }] });
        }

        const isMatch = await bcrypt.compare(password, user.password);

        if (!isMatch) {
            return res.status(400).json({ errors: [{ msg: 'Parolanız yanlış.' }] });
        }

        const payload = {
            user: {
                id: user.id
            }
        };

        jwt.sign(
            payload,
            config.jwtSecret,
            { expiresIn: 360000 },
            (err, token) => {
                if (err) throw err;
                res.json({ token });
            }
        );
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error.');
    }
}
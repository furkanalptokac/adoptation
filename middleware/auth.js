const jwt = require('jsonwebtoken');
const config = require('../config/config');

module.exports = (req, res, next) => {
    const token = req.header('x-auth-token');

    if (!token) {
        return res.status(401).json({ msg: 'No token, authorization denied.' });
    }

    try {
        jwt.verify(token, config.jwtSecret, (error, decoded) => {
            if (error) {
                return res.status(401).json({ msg: 'Token is not valid.' });
            } else {
                req.user = decoded.user;
                next();
            }
        });
    } catch (err) {
        console.error('something wrong.');
        res.status(500).json({ msg: 'Server error' });    
    }
};
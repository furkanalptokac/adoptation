const mongoose = require('mongoose');

const checkObjectId = (id) => (req, res, next) => {
    if (!mongoose.Types.ObjectId.isValid(req.params[idToCheck]))
        return res.status(400).json({ msg: 'Invalid ID' });
    next();
};

module.exports = checkObjectId;
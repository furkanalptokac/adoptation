const { User, validate } = require('../models/User');

exports.signup = async (req, res) => {
    let user = await User.findOne({ email: req.body.email });
    
    if (user) {
        return res.status(400).send('Kayitli kullanici mevcut.');
    } else {
        user = new User({
            name: req.body.name,
            surname: req.body.surname,
            email: req.body.email,
            password: req.body.password,
            bio: req.body.bio,
            city: req.body.city
        });
        await user.save();
        res.send(user);
    }
}
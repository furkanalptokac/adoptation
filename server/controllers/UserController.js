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

exports.findFromEmail = async (req, res) => {
    let user = await User.find({
        email: req.body.email
    });

    if (!user) {
        return res.status(400).send('Bu email ile kullanici bulunamadi.');
    } else {
        res.send(user);
    }
}

exports.deleteFromEmail = async (req, res) => {
    let user = await User.find({
        email: req.body.email
    });

    if (!user) {
        return res.status(400).send('Bu email ile kullanici bulunamadi');
    } else {
        await User.deleteOne(user, function (err) {
            if (err) {
                res.send(err)
            } else {
                res.send('Silindi.')
            }
        });
    }
}
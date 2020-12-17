const bcrypt = require('bcrypt');
const { User, validate } = require('../models/User');

exports.signup = async (req, res) => {
    let user = await User.findOne({ email: req.body.email });
    
    if (user) {
        return res.status(400).send('Kayitli kullanici mevcut.');
    } else {
        let hashedPassword = bcrypt.hashSync(req.body.password, 10);
        user = new User({
            name: req.body.name,
            surname: req.body.surname,
            email: req.body.email,
            password: hashedPassword,
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

exports.findFromId = async (req, res) => {
    User.findById(req.params.id, function (err, user) {
        if (err) {
            res.send(err);
        } else {
            res.send(user);
        }
    })
}

exports.findAllUsers = async (req, res) => {
    await User.find({}, function (err, users) {
        var userMap = {};

        users.forEach(function (user) {
            userMap[user._id] = user;
        });

        res.send(userMap);
    });
}

exports.deleteFromEmail = async (req, res) => {
    User.deleteOne({ 
        email: req.body.email
    }).then(function () {
        res.send('Silindi');
    }).catch(function (err) {
        res.send(err);
    });
}

exports.updateUser = async (req, res) => {
    await User.findByIdAndUpdate(req.params.id, {
        name: req.body.name,
        surname: req.body.surname,
        email: req.body.email,
        password: req.body.password,
        bio: req.body.bio,
        city: req.body.city
    }, function (err, result) {
        if (err) {
            res.send(err);
        } else {
            res.send(result);
        }
    });
}

exports.updatePassword = async (req, res) => {
    await User.findByIdAndUpdate(req.params.id, {
        password: req.body.password
    }, function (err, result) {
        if (err) {
            res.send(err);
        } else {
            res.send(result);
        }
    });
}

exports.deleteProfile = async (req, res) => {

}

exports.generateRandomPassword = async (req, res) => {
    
}
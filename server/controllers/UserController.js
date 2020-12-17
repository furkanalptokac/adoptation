const bcrypt = require('bcrypt');
const passwordValidator = require('password-validator');
const emailValidator = require('email-validator');
const generator = require('generate-password');
const nodemailer = require('nodemailer');
const { User } = require('../models/User');
const emailPassword = require('../config/password');

const schema = new passwordValidator();

schema
.is().min(3)
.is().max(100)
.has().uppercase()
.has().lowercase()

exports.signup = async (req, res) => {
    let user = await User.findOne({ email: req.body.email });

    if (user) {
        return res.status(400).send('Kayitli kullanici mevcut.');
    } else {
        if (schema.validate(req.body.password) && emailValidator.validate(req.body.email)) {
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

            let transporter = nodemailer.createTransport({
                host: 'mail.furkanalp.com',
                port: 587,
                auth: {
                    user: 'sahiplenn@furkanalp.com',
                    pass: emailPassword.password
                },
                tls: {
                    rejectUnauthorized: false
                }
            });
        
            let mailOptions = {
                from: 'sahiplenn@furkanalp.com',
                to: req.body.email,
                subject: 'Sahiplenn Destek',
                text: 'Kaydınız başarıyla oluşturulmuştur.'
            };
        
            transporter.sendMail(mailOptions, (error, info) => {
                if (error) {
                    return console.log(error.message);
                }
        
                console.log('Message sent: %s', info.messageId);
            });

        } else {
            res.send('Parolaniz gereksinimleri karsilamiyor.');
        }
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

exports.generateRandomPassword = async (req, res) => {
    const password = generator.generate({
        length: 10,
        numbers: true
    });

    console.log(password);
}
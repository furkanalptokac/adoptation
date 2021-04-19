const bcrypt = require('bcrypt');
const passwordValidator = require('password-validator');
const emailValidator = require('email-validator');
const passwordGenerator = require('generate-password');
const nodemailer = require('nodemailer');
const jwt = require('jsonwebtoken');
const gravatar = require('gravatar');
const { validationResult } = require('express-validator');
const normalize = require('normalize-url');
const config = require('../config/config');
const { User } = require('../models/User');
const schema = new passwordValidator();
const dotenv = require('dotenv');
dotenv.config();

schema
.is().min(6)
.is().max(100)
.has().uppercase()
.has().lowercase()
.has().digits(1)

exports.signup = async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(422).json({ errors: errors.array() });
    }
    let user = await User.findOne({ email: req.body.email });

    if (user) {
        return res.status(400).send('Kayitli kullanici mevcut.');
    } else {
        if (schema.validate(req.body.password) && emailValidator.validate(req.body.email)) {
            let avatar = normalize(
                gravatar.url(req.body.email, {
                s: '200',
                r: 'pg',
                d: 'mm'
            }), { forceHttps: true }
            );

            let hashedPassword = bcrypt.hashSync(req.body.password, 10);
            user = new User({
                name: req.body.name,
                surname: req.body.surname,
                email: req.body.email,
                password: hashedPassword,
                avatar: avatar
            });

            await user.save();
            
            const payload = {
                user: {
                    id: user.id
                }
            }

            jwt.sign(
                payload,
                config.jwtSecret,
                { expiresIn: 360000 },
                (err, token) => {
                    if (err) throw err;
                    res.json({ token })
                }
            );

            let transporter = nodemailer.createTransport({
                host: process.env.HOST,
                port: process.env.EMAIL_PORT,
                auth: {
                    user: process.env.EMAIL,
                    pass: process.env.EMAIL_PW
                },
                tls: {
                    rejectUnauthorized: false
                }
            });
        
            let mailOptions = {
                from: process.env.EMAIL,
                to: req.body.email,
                subject: 'Adoptation Destek',
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


exports.updatePassword = async (req, res) => {
    try {
        let hashedPassword = bcrypt.hashSync(req.body.password, 10);

        await User.findByIdAndUpdate(req.params.id, {
            password: hashedPassword
        }, (err, result) => {
            if (err) {
                res.send(err);
            } else {
                res.send(result);
            }
        });
    } catch (err) {
        console.error(err)
    }
    
}

exports.forgotPassword = async (req, res) => {
    try {
        let password = passwordGenerator.generate({
            length: 10,
            numbers: true
        });

        let hashedPassword = bcrypt.hashSync(password, 10);

        await User.findOneAndUpdate({ email: req.body.email }, { password: hashedPassword});

        let transporter = nodemailer.createTransport({
            host: process.env.HOST,
            port: process.env.EMAIL_PORT,
            auth: {
                user: process.env.EMAIL,
                pass: process.env.EMAIL_PW
            },
            tls: {
                rejectUnauthorized: false
            }
        });

        let mailOptions = {
            from: process.env.EMAIL,
            to: req.body.email,
            subject: 'Adoptation Destek',
            text: 'Parolanız başarıyla sıfırlanmıştır. Yeni parolanız: ' + password
        };

        transporter.sendMail(mailOptions, (error, info) => {
            if (error) {
                return console.log(error.message);
            }
            console.log('Email başarıyla gönderildi. : %s', info.messageId);
        });
    } catch (err) {
        console.error(err)
    }
}
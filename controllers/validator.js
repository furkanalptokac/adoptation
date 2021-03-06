const { check } = require('express-validator');

exports.register = [
    check('name', 'Isminiz bos olamaz.').notEmpty(),
    check('surname', 'Soyadiniz bos olamaz.').notEmpty(),
    check('email', 'Lutfen gecerli email giriniz.').isEmail(),
    check('password', 'Parolaniz gereksinimleri karsilamiyor.').isLength({ min: 6 }),
];

exports.login = [
    check('email', 'Lutfen gecerli email giriniz.').isEmail(),
    check('password', 'Parolaniz gerekli.').exists(),
];

exports.profilePost = [
    check('location', 'Şehir bilgisi gerekli').notEmpty(),
    check('bio', 'Biyografi gerekli').notEmpty(),
];
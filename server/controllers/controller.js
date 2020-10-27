const Model = require('../models/model');

exports.index = (req, res, next) => {
    res.send('index');
};

exports.test = (req, res, next) => {
    const data = new Model({
        test: req.body.test
    });

    data.save()
        .then(data => {
            res.send(data);
        });
}
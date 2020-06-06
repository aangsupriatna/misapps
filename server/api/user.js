var models = require('../models')
const app = require('express')()

app.post('/user/create', function (req, res) {
    models.User.create({
        username: req.body.username,
        password: req.body.password,
        email: req.body.email
    }).then(function (u) {
        res.send(u);
    });
});

app.delete('/user', async function (req, res) {
    await models.User.destroy({
        where: {
            id: req.body.id
        }
    }).then(function () {
        res.redirect('/');
    });
});

module.exports = app
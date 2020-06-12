var models = require('../models')
const app = require('express')()

// Get
app.get('/user', (req, res) => {
    models.User.findAll({
        include: ['userProfile']
    }).then(function (users) {
        res.send(users)
    });
});

app.get('/user/profile', (req, res) => {
    models.UserProfile.findAll({
        include: ['user']
    }).then(function (users) {
        res.send(users)
    });
});

// Create
app.post('/user/create', function (req, res) {
    models.User.create({
        username: req.body.username,
        password: req.body.password,
        email: req.body.email
    }).then(function (u) {
        res.send(u);
    });
});

app.post('/user/profile/create', function (req, res) {
    models.UserProfile.create({
        gender: req.body.gender,
        address: req.body.address,
        userId: req.body.user_id
    }).then(function (u) {
        res.send(u);
    });
});

// Update

// Delete
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
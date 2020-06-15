var models = require('../models')
const app = require('express')()

// Get
app.get('/user', (req, res) => {
    models.User.findAll({
        include: ['userProfile']
    }).then(function (users) {
        res.send(users)
    }).catch(function (err) {
        res.send(err.errors)
    });
});

app.get('/user/profile', (req, res) => {
    models.UserProfile.findAll({
        include: ['user']
    }).then(function (users) {
        res.send(users)
    }).catch(function (err) {
        res.send(err.errors)
    });
});

// Create
app.post('/user/create', function (req, res) {
    models.User.create({
        username: req.body.username,
        password: req.body.password,
        email: req.body.email,
        userProfile: {
            gender: req.body.gender,
            address: req.body.address
        }
    }, { include: ['userProfile'] }).then(user => {
        res.send(user.toJSON())
    }).catch(err => {
        res.send(err.errors)
    });
});

// Update
app.put('/user/:userId', function (req, res, next) {
    models.User.findOne({ where: { id: req.params.userId }, include: ['userProfile'] }).then(user => {
        Promise.all([
            user.update({
                username: req.body.username,
                password: req.body.password,
                email: req.body.email,
            }),
            user.userProfile.update({
                gender: req.body.gender,
                address: req.body.address
            })
        ]).then(user => {
            res.send(user)
        }).catch(err => {
            res.send(err.errors)
        })
    }).catch(err => {
        res.send(err)
    });
})

// Delete
app.delete('/user', async function (req, res) {
    await models.User.destroy({
        where: {
            id: req.body.id
        }
    }).then(function (msg) {
        res.sendStatus(msg);
    });
});

app.delete('/users', async function (req, res) {
    await models.User.destroy({
        where: {}
    }).then(function (msg) {
        res.send(msg);
    });
});

module.exports = app
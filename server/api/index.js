var models = require('../models')
const app = require('express')()
module.exports = { path: '/api', handler: app }

const user = require('./user')
const project = require('./project')

app.use(user)
app.use(project)


app.get('/hello', (req, res) => {
    models.User.findAll({
        include: [models.Project]
    }).then(function (users) {
        res.send(users)
    });
});
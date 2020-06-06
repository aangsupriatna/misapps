var models = require('../models')
const app = require('express')()

app.get('/project', (req, res) => {
    models.Project.findAll({
        include: [models.User]
    }).then(function (projects) {
        res.send(projects)
    });
});

app.post('/project/create', function (req, res) {
    models.Project.create({
        title: req.body.title,
        location: req.body.location,
        UserId: req.body.user_id
    }).then(function (project) {
        res.send(project);
    });
});

app.delete('/project', async function (req, res) {
    await models.Project.destroy({
        where: {
            id: req.body.id
        }
    }).then(function () {
        res.redirect('/');
    });
})

module.exports = app
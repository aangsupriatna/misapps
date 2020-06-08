var models = require('../models')
const app = require('express')()

app.get('/project', (req, res) => {
    models.Project.findAll({
        include: ['company', 'experts']
    }).then(function (projects) {
        res.send(projects)
    });
});

app.post('/project/create', function (req, res) {
    // models.Project.create({
    //     title: req.body.title,
    //     location: req.body.location,
    //     CompanyId: req.body.company_id,
    //     ExpertId: req.body.expert_id,
    // }).then(function (project) {
    //     res.send(project);
    // });
  models.Project.create({ title: req.body.title, location: req.body.location, companyId: req.body.company_id})
    .then((newProject) => {
      res.send(newProject)
    })
    .catch((err) => {
      console.log("Error while projects creation : ", err)
    })
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

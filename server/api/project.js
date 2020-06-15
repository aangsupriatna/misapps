var models = require('../models')
const app = require('express')()

app.get('/project', (req, res) => {
  models.Project.findAll({
    include: ['company', 'experts']
  }).then(function (projects) {
    res.send(projects)
  }).catch(function (err) {
    res.send(err.errors)
  });
});

app.post('/project/create', function (req, res) {
  models.Project.create(
    {
      title: req.body.title,
      location: req.body.location,
      companyId: req.body.company_id
    })
    .then((newProjects) => {
      models.Expert.findOne({ where: { id: req.body.expert_id }, include: ['projects'] })
        .then((expert) => {
          expert.addProjects(newProjects)
            .then((joinedExpertsProjects) => {
              console.log(joinedExpertsProjects)
            })
        }).catch(function (err) {
          res.send(err.errors)
        });
    }).catch(function (err) {
      res.send(err.errors)
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

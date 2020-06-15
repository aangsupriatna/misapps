var models = require('../models')
const app = require('express')()

app.get('/expert', (req, res) => {
  models.Expert.findAll({
    include: ['projects', 'companies']
  }).then(function (expert) {
    res.send(expert)
  }).catch(function (err) {
    res.send(err.errors)
  });
});

app.post('/expert/create', function (req, res) {
  models.Expert.create(
    {
      name: req.body.name,
      address: req.body.address
    })
    .then((newExperts) => {
      models.Company.findOne({ where: { id: req.body.company_id }, include: ['experts'] })
        .then((companies) => {
          companies.setExperts(newExperts)
            .then((joinedExpertsCompanies) => {
              res.send(joinedExpertsCompanies)
            })
        }).catch(function (err) {
          res.send(err.errors)
        });
    }).catch(function (err) {
      res.send(err.errors)
    });

});

app.post('/expert/creates', function (req, res) {
  models.Expert.bulkCreate([
    {
      name: 'Expert 1',
      address: 'Sumedang'
    },
    {
      name: 'Expert 2',
      address: 'Subang'
    },
    {
      name: 'Expert ',
      address: 'Bogor'
    }
  ])
    .then((newExperts) => {
      models.Company.findAll({ where: { id: [1, 2, 3] }, include: ['experts'] })
        .then((companies) => {
          companies.forEach(company => {
            company.setExperts(newExperts)
              .then((joinedExpertsCompanies) => {
                console.log(joinedExpertsCompanies)
              }).catch(function (err) {
                res.send(err.errors)
              });
          });
        }).catch(function (err) {
          res.send(err.errors)
        });
    }).catch(function (err) {
      res.send(err.errors)
    });

});

app.delete('/expert', async function (req, res) {
  await models.Expert.destroy({
    where: {
      id: req.body.id
    }
  }).then(function () {
    res.redirect('/');
  });
})

module.exports = app

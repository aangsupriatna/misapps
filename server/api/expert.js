var models = require('../models')
const app = require('express')()

app.get('/expert', (req, res) => {
  models.Expert.findAll({
    include: [models.Project, 'companies']
  }).then(function (expert) {
    res.send(expert)
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
          companies.addExperts(newExperts)
            .then((joinedExpertsCompanies) => {
              console.log(joinedExpertsCompanies)
            })
        })
        .catch((err) => console.log("Error while Company search : ", err))
    })
    .catch((err) => console.log("Error while Experts creation : ", err))

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
          // For user 1, 2 and 3 set the sames workingDays
          companies.forEach(company => {
            company.setExperts(newExperts) // workingDays is an array (one user hasMany workingDays)
              .then((joinedExpertsCompanies) => {
                console.log(joinedExpertsCompanies)
              })
              .catch((err) => console.log("Error while joining Experts and Companies : ", err))
          });
        })
        .catch((err) => console.log("Error while Company search : ", err))
    })
    .catch((err) => console.log("Error while Experts creation : ", err))

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

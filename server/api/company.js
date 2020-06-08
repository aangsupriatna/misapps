var models = require('../models')
const app = require('express')()

app.get('/company', (req, res) => {
  models.Company.findAll({
    include: [models.Project, 'experts']
  }).then(function (company) {
    res.send(company)
  });
});

app.post('/company/create', function (req, res) {
  // models.Company.create({
  //     name: req.body.name,
  //     address: req.body.address
  // }).then(function (company) {
  //     res.send(company);
  // });
  models.Company.bulkCreate([
    { name: 'PT. Miskat Alam Konsultan', address: 'Jakarta' },
    { name: 'PT. Binadaya Inti Dinamika', address: 'Bandung' },
    { name: 'PT. Miskat Alam Internasional', address: 'Papua' }
  ])
    .then((newCompany) => {
      console.log(newCompany)
    })
    .catch((err) => {
      console.log("Error while company creation : ", err)
    })
});

app.delete('/company', async function (req, res) {
  await models.Company.destroy({
    where: {
      id: req.body.id
    }
  }).then(function () {
    res.redirect('/');
  });
})

module.exports = app

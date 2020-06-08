var models = require('../models')
const app = require('express')()

app.get('/company', (req, res) => {
  models.Company.findAll({
    include: ['projects', 'experts']
  }).then(function (company) {
    res.send(company)
  });
});

app.post('/company/create', function (req, res) {
  models.Company.create({ name: req.body.name, address: req.body.address })
    .then((newCompany) => {
      res.send(newCompany)
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

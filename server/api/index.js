var models = require('../models')
const app = require('express')()
module.exports = { path: '/api', handler: app }

const user = require('./user')
const project = require('./project')
const company = require('./company')
const expert = require('./expert')

app.use(user)
app.use(project)
app.use(company)
app.use(expert)


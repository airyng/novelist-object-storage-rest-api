const DefaultController = require('./classes/Default')
const User = require('../models/user')

module.exports = new DefaultController(User)
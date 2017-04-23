const dateFormat = require('dateformat')

module.exports = (req, res, next) => {
  req.dateFormat = require('dateformat')
  next()
}

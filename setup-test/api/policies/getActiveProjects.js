module.exports = (req, res, next) => {
  Projects.find({company: req.params.companyId}).populate('customer').where({'status': 'active'}).exec((err, result) => {
    req.activeProjects = result
    next()
  })
}

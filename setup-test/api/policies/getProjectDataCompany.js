module.exports = (req, res, next) => {
  Companies.getProjects(req.params.companyId, (err, result) => {
    if (err) console.log(err)
    req.projects = result
    next()
  })
}

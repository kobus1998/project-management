module.exports = (req, res, next) => {

  Companies.getTitlesOfMembers(req.params.companyId, (err, result) => {
    req.companyMembers = result
    next()
  })

}

module.exports = (req, res, next) => {

  Companies.getCompanieData(req.params.companyId, (err, result) => {
    if (err) res.redirect('/dashboard')
    else {
      req.companyData = result[0]
      next()
    }
  })

}

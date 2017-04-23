module.exports = (req, res, next) => {
  if (req.companyData.privacy !== 'public' && typeof req.userTitle !== 'undefined') {
    res.redirect('/dashboard')
  } else {
    next()
  }
}

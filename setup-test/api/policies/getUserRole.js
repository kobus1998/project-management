module.exports = (req, res, next) => {
  Companies.checkUserIsMember(req.params.companyId, req.session.userId, (err, result) => {
    if (result === 0 && req.companyData.privacy === 'private') {
      res.redirect('/dashboard')
    } else if (result === 0 && req.companyData.privacy === 'public') {
      req.userTitle = 'guest'
      next()
    } else if (result === 1) {
      Companies.getTitleLoggedIn(req.params.companyId, req.session.userId, (err, result) => {
        req.userTitle = result.title
        next()
      })
    } else {
      res.redirect('/dashboard')
    }

  })
}

module.exports = (req, res, next) => {

  if (typeof req.session.userId === 'undefined') {
    res.redirect('/login')
  } else {
    next()
  }

}

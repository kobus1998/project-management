module.exports = (req, res, next) => {
  if (typeof req.session.userId !== 'undefined') {
    res.redirect('/dashboard')
  } else {
    next()
  }
}

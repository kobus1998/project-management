module.exports = (req, res, next) => {
  if (req.params.userId !== req.session.userId) {
    res.redirect('/dashboard')
  } else {
    next()
  }
}

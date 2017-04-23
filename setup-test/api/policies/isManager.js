module.exports = (req, res, next) => {
  if (req.userTitle !== 'manager') {
    res.redirect('/dashboard')
  } else {
    next()
  }
}

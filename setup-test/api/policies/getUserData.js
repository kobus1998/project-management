module.exports = (req, res, next) => {
  Users.getUserData(req.session.userId, (err, user) => {
    req.userData = user
    next()
  })
}

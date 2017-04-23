module.exports = (req, res, next) => {
  Projects.countUserIsInProject(req.params.projectId, req.session.userId, (err, result) => {
    if (result.users.length > 0) {
      next()
    } else {
      res.redirect('/dashboard')
    }
  })
}

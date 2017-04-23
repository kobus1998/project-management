module.exports = (req, res, next) => {
  Projects.getProjectData(req.params.projectId, (err, result) => {
    req.projectData = result[0]
    next()
  })
}

/**
 * ProjectsController
 *
 * @description :: Server-side logic for managing Projects
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {

	createProjectPage: (req, res) => {
		res.view('app/projects/project-create', {company: req.companyData, userTitle: req.userTitle})
	},

	viewProjectPage: (req, res) => {
		res.view('app/projects/project', {company: req.companyData, userTitle: req.userTitle, project: req.projectData, dateFormat: req.dateFormat})
	},

	settingsProjectPage: (req, res) => {
		res.view('app/projects/project-settings', {company: req.companyData, userTitle: req.userTitle, project: req.projectData})
	},

	createProject: (req, res) => {
		let data = req.body
		Projects.createProject({
			customer: data.customer,
			name: data.name,
			desc: data.desc,
			price: parseInt(data.price),
			deadline: data.deadline,
			company: data.companyId
		}, (err, result) => {
			if (err) res.badRequest(err)
			else {
				let projectId = result.id
				let customerId = result.customer
				Projects.addUserToProject(projectId, req.session.userId, true, (err, result) => {
					res.redirect(`/project/view/${data.companyId}/${customerId}/${projectId}`)
				})
			}
		})
	},

	updateProject: (req, res) => {
		let data = req.body
		let projectId = req.params.projectId

		Projects.updateProject(projectId, {
			name: data.name,
			desc: data.desc,
			price: data.price,
			deadline: data.deadline,
			status: data.status,
			paid: Projects.setNumToBool(data.paid),
		}, (err, result) => {
			if (err) res.send(err)
			else {
				res.redirect(`/project/view/${data.companyId}/${data.customerId}/${projectId}`)
			}
		})

	},

	deleteProject: (req, res) => {
		let projectId = req.params.projectId
		Projects.deleteProject(projectId, (err, result) => {
			if (err) res.badRequest('failed to delete project')
			else {
				res.ok('project has been deleted!')
			}
		})
	},

	addUserToProject: (req, res) => {
		let projectId = req.params.projectId
		let userId = req.params.userId
		Projects.addUserToProject(projectId, userId, true, (err, result) => {
			if (err) res.badRequest('failed to add user to project')
			else {
				res.ok('user has been added to the project')
			}
		})
	},

	createSoftware: (req, res) => {
		let projectId = req.params.projectId
		let data = req.body
		Software.createSoftware(projectId, {
			name: data.name,
			version: data.version,
			desc: data.desc
		}, (err, result) => {
			if (err) console.log(err)
			res.redirect('back')
		})
	},

	deleteSoftware: (req, res) => {
		let projectId = req.params.projectId
		let softwareId = req.params.softwareId
		Software.deleteSoftware(projectId, softwareId, (err, result) => {
			if (err) console.log(err)
			res.redirect('back')
		})
	},

	createTodo: (req, res) => {
		let projectId = req.params.projectId
		let data = req.body

		if (typeof data.important !== 'undefined') {
			data.important = true
		}

		Todos.createTodo(projectId, {
			name: data.name,
      done: data.done,
      important: data.important
		}, (err, result) => {
			if (err) console.log(err)
			res.redirect('back')
		})

	},

	changeStateTodo: (req, res) => {
		let projectId = req.params.projectId
		let todoId = req.params.todoId
		let data = req.body

		let donePromise = new Promise((resolve, reject) => {
			if (data.done === 'true') {
				data.done = true
				resolve()
			} else {
				data.done = false
				resolve()
			}
		}).then(() => {
			Todos.updateTodo(projectId, todoId, {done: data.done}, (err, result) => {
				if (err) console.log(err)
				res.redirect('back')
			})
		})

	},

	deleteTodo: (req, res) => {
		let projectId = req.params.projectId
		let todoId = req.params.todoId

		Todos.deleteTodo(projectId, todoId, (err, result) => {
			if (err) console.log(err)
			res.redirect('back')
		})
	}

};

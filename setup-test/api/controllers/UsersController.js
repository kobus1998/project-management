/**
 * UsersController
 *
 * @description :: Server-side logic for managing Users
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

const dateFormat = require('dateformat')
const Jimp = require("jimp");
module.exports = {

	//pages

	projectsListPage: (req, res) => {
		res.view('app/users/myProjects', {user: req.userData, dateFormat: req.dateFormat})
	},

	dashboardPage: (req, res) => {
		res.view('app/dashboard', {user: req.userData})
	},

	userSettingsPage: (req, res) => {
		res.view('app/users/userSettings', {user: req.userData, userAvatar: req.userAvatar})
	},

	createCompanyPage: (req, res) => {
		res.view('app/companies/create-company', {user: req.userData})
	},

	searchProjectsPage: (req, res) => {
		let search = req.allParams().s
		if (typeof search !== 'undefined' && search.length > 0) {
			Projects.searchProjects(search, (err, result) => {
				res.view('app/users/searchprojects', {user: req.userData, search: result, dateFormat: req.dateFormat})
			})
		} else {
			res.view('app/users/searchprojects', {user: req.userData})
		}

	},

	companyListPage: (req, res) => {
		res.view('app/companies/company-list', {user: req.userData, dateFormat: dateFormat})
	},

	companySearchPage: (req, res) => {
		let search = req.allParams().s
		if (typeof search !== 'undefined' && search.length > 0) {
			Companies.searchCompany(search, (err, result) => {
				if (err) res.redirect('/dashboard')
				else {
					return res.view('app/companies/companies-search', {search: result})
				}
			})
		} else {
			return res.view('app/companies/companies-search')
		}
	},

	uploadAvatar: (req, res) => {

		req.file('avatar').upload({
			maxBytes: 50000000,
			dirname: '../../assets/images/',
			saveAs: function(file, cb) {
				let newFileName = `${file.byteCount}${req.session.userId}${file.filename}`
		    cb(null, newFileName);
		  }
		}, function whenDone(err, upload) {
			let dateNow = Date.now()
			if (err) console.log(err)
			if (upload.length === 0) {
				res.redirect('/dashboard/settings')
			}

			let fileName = `${upload[0].size}${req.session.userId}${upload[0].filename}`


			Jimp.read(upload[0].fd).then(function (image) {
    		image.resize(160, 160).quality(50).normalize().write(`${upload[0].fd}`)
			}).catch(function (err) {
			   console.log(err)
			})

			Users.updateUser(req.session.userId, {
				avatar: `/images/${upload[0].size}${req.session.userId}${upload[0].filename}`,
			}, (err, result) => {
				if (err) res.send(err)
				res.redirect('/dashboard/settings')
			})

		})
	},

	updateUser: (req, res) => {
		let data = req.body
		let userId = req.params.userId

		let userData = {
			email: data.email,
			firstname: data.firstname,
			lastname: data.lastname,
			gender: data.gender
		}
		if (userId === req.session.userId) {
			Users.updateUser(userId, userData, (err, result) => {
				if (err) res.redirect('/dashboard/settings')
				else {
					res.redirect('/dashboard')
				}
			})
		} else {
			res.redirect('/dashboard')
		}
	},

	deleteUser: (req, res) => {
		let userId = req.params.userId
		Users.deleteUser(userId, (err, result) => {
			if (err) res.badRequest('youre not allowed to delete this user')
			else {
				res.ok('user deleted')
			}
		})
	},

	createReminder: (req, res) => {
		let data = {
			name: req.body.name,
			userId: req.session.userId
		}
		Users.createReminder(data, (err, result) => {
			if (err) res.redirect('/dashboard')
			res.redirect('/dashboard')
		})
	},

	deleteReminder: (req, res) => {

		Users.findReminder(req.params.reminderId, (err, result) => {
			if (result.user === req.session.userId) {
				Users.deleteReminder(req.params.reminderId, (err, result) => {
					if (err) res.redirect('/dashboard')
					res.redirect('/dashboard')
				})
			} else {
				res.redirect('/dashboard')
			}
		})
	},

};

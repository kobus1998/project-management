/**
 * CompaniesController
 *
 * @description :: Server-side logic for managing Companies
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

const dateFormat = require('dateformat')

module.exports = {

	companyPage: (req, res) => {
		res.view('app/companies/company', {company: req.companyData, activeProjects: req.activeProjects, dateFormat: req.dateFormat})
	},

	companySettingsPage: (req, res) => {
		Companies.getTitlesOfMembers(req.params.companyId, (err, titles) => {
			res.view('app/companies/company-settings', {company: req.companyData, users: titles, userTitle: req.userTitle})
		})
	},

	customerCreatePage: (req, res) => {
		res.view('app/customers/customer-create', {company: req.companyData})
	},

	inviteMemberPage: (req, res) => {
		let userId = req.session.userId
		let companyId = req.params.companyId
		let search = req.allParams().s
		if (typeof search !== 'undefined' && search.length > 0) {
			Users.searchUser(search, (err, searchResult) => {
				if (err) res.redirect('/dashboard')
				else {
					res.view('app/companies/invite-member', {company: req.companyData, userTitle: req.userTitle, search: searchResult})
				}
			})
		} else {
			res.view('app/companies/invite-member', {company: req.companyData, userTitle: req.userTitle})
		}
	},

	searchCustomersPage: (req, res) => {
		let companyId = req.params.companyId
		let filterParams = req.allParams()
		Customers.filterCustomers({
			query: filterParams.query,
			active: filterParams.active,
			sortName: filterParams.sortName
		}, req.params.companyId, (err, result, countPages) => {
			res.view('app/customers/customer-search', {
				company: req.companyData, userTitle: req.userTitle,
				dateFormat: req.dateFormat,
				filter: result, countPages: countPages
			})
		})
	},

	projectListPage: (req, res) => {
		let companyId = req.params.companyId
		let filterParams = req.allParams()
		Projects.filterProjects({
			query: filterParams.query,
			status: filterParams.status,
			paid: filterParams.paid,
			price: filterParams.price,
			deadline: filterParams.deadline,
			page: filterParams.page
		}, req.params.companyId, (err, result, countPages) => {
			res.view('app/companies/project-list', {
				company: req.companyData, userTitle: req.userTitle,
				dateFormat: req.dateFormat, projects: req.projects,
				filter: result, countPages: countPages
			})
		})
	},

	projectSearchPage: (req, res) => {
		let search = req.allParams().s
		let companyId = req.params.companyId
		if (typeof search !== 'undefined' && search.length > 0) {
			Companies.searchProjects(search, companyId, (err, result) => {
				res.view('app/companies/search-project', {company: req.companyData, userTitle: req.userTitle, dateFormat: req.dateFormat, search: result})
			})
		} else {
			res.view('app/companies/search-project', {company: req.companyData, userTitle: req.userTitle, dateFormat: req.dateFormat})
		}
	},

	membersPage: (req, res) => {
		res.view('app/companies/companiesMembers', {company: req.companyData, userTitle: req.userTitle, dateFormat: req.dateFormat})
	},

	searchMembers: (req, res) => {
		let search = req.allParams().s
		let companyId = req.params.companyId
		if (typeof search !== 'undefined' && search.length > 0) {
			Companies.searchMembers(search, companyId, (err, result) => {
				res.view('app/companies/searchMembers', {company: req.companyData, userTitle: req.userTitle, dateFormat: req.dateFormat, search: result})
			})
		} else {
			res.view('app/companies/searchMembers', {company: req.companyData, userTitle: req.userTitle, dateFormat: req.dateFormat})
		}
	},

	getTitle: (req, res) => {
		let userId = req.params.userId
		let companyId = req.params.companyId

		Companies.getMemberTitle(companyId, userId, (err, result) => {
			res.send(result)
		})
	},

	createCompany: (req, res) => {
		let data = req.body
		let userId = req.params.userId
		let companyData = {
			name: data.name,
			desc: data.desc,
			privacy: data.privacy
		}
		if (userId === req.session.userId) {
			Companies.createCompany(userId, companyData, (err, result) => {
				if (err) {
					console.log(err)
					res.redirect('/company/create')
				}
				else {
					Companies.updateMemberTitle(result.id, req.session.userId, {title: 'manager', active: true}, (err, xxx) => {
						res.redirect('/company/view/' + result.id)
					})
				}
			})
		} else {
			res.redirect('/company/create')
		}
	},

	updateCompany: (req, res) => {
		let data = req.body
		let companyId = req.params.companyId

		let companyData = {
			name: data.name,
			desc: data.desc,
			privacy: data.privacy
		}
		Companies.updateCompany(companyId, companyData, (err, result) => {
			if (err) res.badRequest('failed to update company')
			else {
				res.redirect(`/company/settings/${companyId}`)
			}
		})
	},

	deleteCompany: (req, res) => {
		let companyId = req.params.companyId
		Companies.deleteCompany(companyId, (err, result) => {
			if (err) res.badRequest('failed to delete company')
			else {
				res.ok('company has been deleted!')
			}
		})
	},

	addUserToCompany: (req, res) => {
		let userId = req.params.userId
		let companyId = req.params.companyId
		Companies.addUserToCompany(companyId, userId, (err, result) => {
			if (err) res.redirect(`/company/invite/${companyId}`)
			else {
				res.redirect(`/company/invite/${companyId}`)
			}
		})
	},

	removeUserFromCompany: (req, res) => {
		let userId = req.params.userId
		let companyId = req.params.companyId

		Companies.getTitleLoggedIn(companyId, req.session.userId, (err, result) => {
			if (typeof result !== 'undefined') {
				Companies.removeUserFromCompany(companyId, userId, (err, result) => {
					if (err) console.log(err)
					if (userId === req.session.userId) {
						res.redirect('/dashboard')
					} else {
						res.redirect(`/company/settings/${companyId}`)
					}
				})
			} else {
				res.redirect('/dashboard')
			}
		})


	},

	updateCompanyRole: (req, res) => {
		let userId = req.params.userId
		let companyId = req.params.companyId
		let data = req.body
		Companies.updateMemberTitle(companyId, userId, {title: data.title, active: true}, (err, result) => {
			if (err) res.redirect('/dashboard')
			else {
				res.redirect(`/company/settings/${companyId}`)
			}
		})
	}

};

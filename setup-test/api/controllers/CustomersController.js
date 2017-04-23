/**
 * CustomersController
 *
 * @description :: Server-side logic for managing Customers
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {

	customerViewPage: (req, res) => {
		res.view('app/customers/customer', {company: req.companyData, customer: req.customerData, dateFormat: req.dateFormat})
	},

	customerCompanyListPage: (req, res) => {
		res.view('app/customers/customer-company-list', {company: req.companyData})
	},

	createCustomer: (req, res) => {
		let data = req.body
		let companyId = req.params.companyId
		let userId = req.session.userId
		Companies.getSingleCompanyMember(companyId, userId, (err, result) => {
			if (result.members.length > 0) {
				Customers.createCustomer(companyId, data, (err, result) => {
					if (err) res.redirect('/dashboard')
					else {
						res.redirect(`/customer/view/${companyId}/${result.id}`)
					}
				})
			} else {
				res.redirect('/dashboard')
			}
		})


	},

	updateCustomer: (req, res) => {
		let data = req.body
		let customerId = req.params.customerId



		Customers.updateCustomer(customerId, data, (err, result) => {
			if (err) res.badRequest('failed to update customer')
			else {
				res.ok('customer has been updated!')
			}
		})
	},

	deleteCustomer: (req, res) => {
		let customerId = req.params.customerId
		Customers.deleteCustomer(customerId, (err, result) => {
			if (err) res.badRequest('failed to delete customer')
			else {
				res.ok('customer has been deleted')
			}
		})
	}

};

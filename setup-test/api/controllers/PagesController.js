/**
 * PagesController
 *
 * @description :: Server-side logic for managing Pages
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

const dateFormat = require('dateformat')

module.exports = {

	tester: (req, res) => {
		console.log(req.allParams())
		Projects.filterProjects(
			{
				query: '',
				status: 'active',
				paid: 'false',
				price: 'DESC',
				deadline: 'DESC',
			}, (err, result) => {
			if (err) res.send(err)
			res.send(result)
		})
	},





};

/**
 * GuardedPagesController
 *
 * @description :: Server-side logic for managing guardedpages
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {

	checkGuard: (req, res) => {
		let sends = [req.companyData, req.userTitle]
		res.send(sends)
	},

	

};

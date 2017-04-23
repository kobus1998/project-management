/**
 * UnguardedPagesController
 *
 * @description :: Server-side logic for managing unguardedpages
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {

	loginPage: (req, res) => {
		res.view('app/users/login')
	},

	registerPage: (req, res) => {
		res.view('app/users/register')
	}

};

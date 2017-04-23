/**
 * AuthController
 *
 * @description :: Server-side logic for managing auths
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {
	register: (req, res) => {
		let data = req.body
		let userData = {
			email: data.email,
			password: data.password
		}
		if (data['password'] !== data['confirm-password']) {
			res.redirect('/register')
		} else {
			Users.createUser(userData, (err, result) => {
				if (err) {
					res.redirect('/register')
				} else {
					Users.login(req, result.id)
					res.redirect('/dashboard')
				}
			})
		}
	},

	login: (req, res) => {
		let data = req.body
		Users.countUsers({email: data.email}, (err, result) => {
      if (result === 0) {
        res.redirect('/login')
      } else {
        Users.findUserByEmail(data.email, (err, result) => {
					let userId = result.id
          Users.compareHash(data.password, result.password, (err, result) => {
            if (result) {
              Users.login(req, userId)
							res.redirect('/dashboard')
            } else {
              res.redirect('/login')
            }
          })
        })
      }
    })
	},

	logout: (req, res) => {
		req.session.destroy()
		setTimeout(() => {
			res.redirect('/')
		},500)
	},

};

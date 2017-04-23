/**
 * Companies.js
 *
 * @description :: TODO: You might write a short summary of how this model works and what it represents here.
 * @docs        :: http://sailsjs.org/documentation/concepts/models-and-orm/models
 */

module.exports = {

  attributes: {

    name: {
      type: 'string',
      required: true,
      unique: true
    },

    desc: {
      type: 'string'
    },

    members: {
      collection: 'users',
      via: 'companies',
      through: 'companieusers',
      defaultsTo: []
    },

    customers: {
      collection: 'customers',
      via: 'company',
      defaultsTo: []
    },

    privacy: {
      type: 'string',
      defaultsTo: 'private',
      enum: ['public', 'private'],
    },

  },

  getAllCompanies: (callback) => {
    Companies.find().populate('customers').populate('members').exec((err, result) => {
      callback(err, result)
    })
  },

  getActiveProjects: (companyId, callback) => {
    Customers.find({company: companyId}).populate('projects', {where: {status: 'active'}}).exec((err, result) => {
      callback(err, result)
    })
  },

  getCompanieData: (companyId, callback) => {
    Companies.find({id: companyId}).populate('customers').populate('members').exec((err, result) => {
      callback(err, result)
    })
  },



  createCompany: (userId, data, callback) => {
    data.members = [userId]
    Companies.create(data).exec((err, result) => {
      callback(err, result)
    })
  },

  updateCompany: (companyId, data, callback) => {
    Companies.update({id: companyId}, data).exec((err, result) => {
      callback(err, result)
    })
  },

  deleteCompany: (companyId, callback) => {
    Companies.destroy({id: companyId}).exec((err, result) => {
      callback(err, result)
    })
  },

  // finds

  searchCompany: (query, callback) => {
    Companies.find({name: {'like': `%${query}%`}}).exec((err, result) => {
      callback(err, result)
    })
  },

  getCompanyMembers: (companyId, callback) => {
    Companies.findOne({id: companyId}).populate('members').exec((err, result) => {
      callback(err, result)
    })
  },

  getSingleCompanyMember: (companyId, userId, callback) => {
    Companies.findOne({id: companyId}).populate('members', {where: {id: userId}}).exec((err, result) => {
      callback(err, result)
    })
  },

  checkUserIsMember: (companyId, userId, callback) => {
    CompanieUsers.count({companies: companyId, members: userId}).exec((err, result) => {
      callback(err, result)
    })
  },

  getTitleLoggedIn: (companyId, userId, callback) => {
    CompanieUsers.findOne({companies: companyId, members: userId}).exec((err, result) => {
      callback(err, result)
    })
  },

  getTitlesOfMembers: (companyId, callback) => {
    CompanieUsers.find({companies: companyId}).populate('members', {where: {active: true}}).exec((err, result) => {
      callback(err, result)
    })
  },

  updateMemberTitle: (companyId, userId, data, callback) => {
    CompanieUsers.update({companies: companyId, members: userId}, data).exec((err, result) => {
      callback(err, result)
    })
  },

  addUserToCompany: (companyId, userId, callback) => {

    CompanieUsers.create({members: userId, companies: companyId}).exec((err, result) => {
      callback(err, result)
    })
  },

  removeUserFromCompany: (companyId, userId, callback) => {
    CompanieUsers.destroy({companies: companyId, members: userId}).exec((err, result) => {
      callback(err, result)
    })
  },

  getProjects: (companyId, callback) => {
    Projects.find({company: companyId}).exec((err, result) => {
      callback(err, result)
    })
  },

  searchProjects: (query, companyId, callback) => {
    Projects.find({name: {like: `%${query}%`}}).where({company: companyId}).exec((err, result) => {
      callback(err, result)
    })
  },

  searchMembers: (query, companyId, callback) => {
    Companies.find({id: companyId}).populate('members', {email: {like: `%${query}%`}}).exec((err, result) => {
      callback(err, result)
    })
  },

};

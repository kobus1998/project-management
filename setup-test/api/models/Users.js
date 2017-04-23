/**
 * Users.js
 *
 * @description :: TODO: You might write a short summary of how this model works and what it represents here.
 * @docs        :: http://sailsjs.org/documentation/concepts/models-and-orm/models
 */

const bcrypt = require('bcrypt-nodejs')

module.exports = {

  attributes: {

    email: {
      type: 'email',
      unique: true,
      required: true
    },

    password: {
      type: 'string',
      required: true
    },

    gender: {
      type: 'string',
      enum: ['male', 'female', ''],
      defaultsTo: ''
    },

    firstname: {
      type: 'string',
      defaultsTo: ''
    },

    lastname: {
      type: 'string',
      defaultsTo: ''
    },

    avatar: {
      type: 'string',
      defaultsTo: ''
    },

    active: {
      type: 'boolean',
      defaultsTo: true
    },

    role: {
      type: 'string',
      enum: ['user', 'mod', 'admin'],
      defaultsTo: 'user'
    },

    companies: {
      collection: 'companies',
      via: 'members',
      through: 'companieusers',
      defaultsTo: []
    },

    projects: {
      collection: 'projects',
      via: 'users',
      through: 'projectusers',
      defaultsTo: []
    },

    reminders: {
      collection: 'reminders',
      via: 'user',
      defaultsTo: []
    }

  },

  // CRUD

  beforeCreate: (values, callback) => {
    Users.hashPass(values.password, (err, hash) => {
      if (err) callback(err)
      values.password = hash
      callback()
    })
  },

  getAllUsers: (callback) => {
    Users.find().populate('companies').populate('projects').exec((err, result) => {
      callback(err, result)
    })
  },

  getUserData: (userId, callback) => {
    Users.findOne({id: userId}).populate('companies').populate('projects', {where: {status: 'active'}} ).populate('reminders').exec((err, result) => {
      callback(err, result)
    })
  },

  getUserCompanies: (userId, callback) => {
    Users.find({id: userId}).populate('companies').exec((err, result) => {
      callback(err, result)
    })
  },

  getUserProjects: (userId, callback) => {
    Users.find({id: userId}).populate('projects').exec((err, result) => {
      callback(err, result)
    })
  },

  findUserById: (userId, callback) => {
    Users.findOne({id: userId}).exec((err, result) => {
      callback(err, result)
    })
  },

  findUserByEmail: (email, callback) => {
    Users.findOne({email: email}).exec((err, result) => {
      callback(err, result)
    })
  },

  countUsers: (data, callback) => {
    Users.count(data).exec((err, num) => {
      callback(err, num)
    })
  },

  createUser: (data, callback) => {
    Users.create(data).exec((err, result) => {
      callback(err, result)
    })
  },

  updateUser: (userId, data, callback) => {
    Users.update({id: userId}, data).exec((err, result) => {
      callback(err, result)
    })
  },

  deleteUser: (userId, callback) => {
    Users.destroy({id: userId}).exec((err, result) => {
      callback(err, result)
    })
  },

  login: (req, userId) => {
    req.session.userId = userId
  },

  // Comparisons

  hashPass: (password, callback) => {
    bcrypt.hash(password, null, null, (err, hash) => {
      callback(err, hash)
    })
  },

  compareHash: (password, hash, callback) => {
    bcrypt.compare(password, hash, (err, result) => {
      callback(err, result)
    })
  },

  createReminder: (data, callback) => {
    let reminderData = {
      name: data.name,
      user: data.userId
    }
    Reminders.create(reminderData).exec((err, result) => {
      if (err) console.log(err)
      else {
        callback(err, result)
      }
    })
  },

  deleteReminder: (reminderId, callback) => {
    Reminders.destroy({id: reminderId}).exec((err, result) => {
      callback(err, result)
    })
  },

  findReminder: (reminderId, callback) => {
    Reminders.findOne({id: reminderId}).exec((err, result) => {
      callback(err, result)
    })
  },

  searchUser: (query, callback) => {
    Users.find({email: {'like': `%${query}%`}}).exec((err, result) => {
      callback(err, result)
    })
  },

};

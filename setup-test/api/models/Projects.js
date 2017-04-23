/**
 * Projects.js
 *
 * @description :: TODO: You might write a short summary of how this model works and what it represents here.
 * @docs        :: http://sailsjs.org/documentation/concepts/models-and-orm/models
 */

module.exports = {

  attributes: {

    name: {
      type: 'string',
      required: true
    },

    desc: {
      type: 'string'
    },

    deadline: {
      type: 'date',
      defaultsTo: ''
    },

    price: {
      type:'string',
      isInt:true
    },

    paid: {
      type: 'boolean',
      defaultsTo: false
    },

    users: {
      collection: 'users',
      via: 'projects',
      through: 'projectusers',
      defaultsTo: []
    },

    customer: {
      type: 'string',
      model: 'customers',
      required: true
    },

    company: {
      model: 'companies',
      required: true
    },

    software: {
      collection: 'software',
      via: 'project',
      defaultsTo: []
    },

    status: {
      type: 'string',
      defaultsTo: 'active',
      enum: ['active', 'stopped', 'done']
    },

    todos: {
      collection: 'todos',
      via: 'project',
      defaultsTo: []
    }

  },

  types:{
    isInt:function(value){
      if(typeof value==='number' && value=== Math.floor(value)){
        return true;
      }
      if(!isNaN(1*value)){
        return true;
      }
      return false;
    }
  },

  getAllProjects: (callback) => {
    Projects.find().populate('customer').populate('users').exec((err, result) => {
      callback(err, result)
    })
  },

  getProjectData: (projectId, callback) => {
    Projects.find({id: projectId}).populate('customer').populate('users', {where: {active: true}}).populate('todos').populate('software').exec((err, result) => {
      callback(err, result)
    })
  },

  findProjectById: (projectId, callback) => {
    Projects.find({id: projectId}).exec((err, result) => {
      callback(err, result)
    })
  },

  createProject: (data, callback) => {
    Projects.create(data).exec((err, result) => {
      callback(err, result)
    })
  },

  updateProject: (projectId, data, callback) => {

    Projects.update({id: projectId}, data).exec((err, result) => {
      callback(err, result)
    })
  },

  deleteProject: (projectId, callback) => {
    Projects.destroy({id: projectId}).exec((err, result) => {
      callback(err, result)
    })
  },

  // finds

  getProjectUsers: (projectId, callback) => {
    Projects.find({id: projectId}).populate('users').exec((err, result) => {
      callback(err, result[0])
    })
  },

  addUserToProject: (projectId, userId, active, callback) => {

    ProjectUsers.create({project: projectId, user: userId, active: active}).exec((err, result) => {
      callback(err, result)
    })
  },

  countUserIsInProject: (projectId, userId, callback) => {
    Projects.findOne({id: projectId}).populate('users', {where: {'id': userId}}).exec((err, result) => {
      callback(err, result)
    })
  },

  setNumToBool: (val) => {
    if (val === '0') {
      return false
    } else if (val === '1') {
      return true
    }
  },

  searchProjects: (query, callback) => {
    Projects.find({name: {like: `%${query}%`}}).populate('customer').populate('users').populate('todos').populate('software').exec((err, result) => {
      callback(err, result)
    })
  },

  filterProjects: (filters, companyId, callback) => {
    let sort = {}
    let where = {
      company: companyId
    }
    let paginate = {}

    let filterProjects = new Promise((resolve, reject) => {

      if (typeof filters.query !== 'undefined') {
        if (filters.query.length > 0) {
          where.name = {
            like: `%${filters.query}%`
          }
        }
      }

      if (typeof filters.status !== 'undefined') {
        if (filters.status.length > 0) {
          where.status = {
            like: `${filters.status}`
          }
        }
      }

      if (typeof filters.deadline !== 'undefined') {
        if (filters.deadline.length > 0) {
          sort.deadline = `${filters.deadline}`
        }
      }

      if (typeof filters.price !== 'undefined') {
        if (filters.price.length > 0) {
          sort.price = `${filters.price}`
        }
      }

      if (typeof filters.paid !== 'undefined') {
        if (filters.paid.length > 0) {
          where.paid = filters.paid
        }
      }

      if (typeof filters.page !== 'undefined' ) {
        if (filters.page.length > 0) {
          paginate.page = parseInt(filters.page)
          paginate.limit = 15
        }
      }
      resolve()
    })

    filterProjects.then(() => {
      Projects.find().where(where).sort(sort).paginate(paginate).exec((err, result) => {
        Projects.count({where: where, sort: sort}).exec((err, count) => {
          callback(err, result, count)
        })

      })
    })





  },
};

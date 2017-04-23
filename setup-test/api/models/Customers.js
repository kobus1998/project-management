/**
 * Customers.js
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

    companyName: {
      type: 'string'
    },

    company: {
      model: 'companies',
      required: true
    },

    projects: {
      collection: 'projects',
      via: 'customer',
      defaultsTo: []
    },

    active: {
      type: 'boolean',
      defaultsTo: true
    }

  },

  getAllCustomers: (callback) => {
    Customers.find().populate('projects').exec((err, result) => {
      callback(err, result)
    })
  },

  getCustomerData: (customerId, callback) => {
    Customers.findOne({id: customerId}).populate('projects').exec((err, result) => {
      callback(err, result)
    })
  },

  createCustomer: (companyId, data, callback) => {
    data.company = companyId
    Customers.create(data).exec((err, result) => {
      callback(err, result)
    })
  },

  updateCustomer: (customerId, data, callback) => {
    Customers.update({id: customerId}, data).exec((err, result) => {
      callback(err, result)
    })
  },

  deleteCustomer: (customerId, callback) => {
    Customers.destroy({id: customerId}).exec((err, result) => {
      callback(err, result)
    })
  },

  searchCustomerCompany: (query, companyId, callback) => {
    Customers.find({
      name: {like: `%${query}%`},
    }).where({company: companyId}).exec((err, result) => {
      callback(err, result)
    })
  },

  filterCustomers: (filters, companyId, callback) => {

    let where = {
      company: companyId
    }
    let sort = {}
    let paginate = {}

    let filterCustomers = new Promise((resolve, reject) => {

      if (typeof filters.query !== 'undefined') {
        if (filters.query.length > 0) {
          where.name = {
            like: `%${filters.query}%`
          }
          where.companyName = {
            like: `%${filters.query}%`
          }
        }
      }

      if (typeof filters.active !== 'undefined') {
        if (filters.active.length > 0) {
          where.active = filters.active
        }
      }

      if (typeof filters.sortName !== 'undefined') {
        if (filters.sortName.length > 0) {
          sort.name = filters.sortName
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

    filterCustomers.then(() => {
      Customers.find().where(where).sort(sort).paginate(paginate).exec((err, result) => {
        Customers.count({where: where, sort: sort}).exec((err, count) => {
          callback(err, result, count)
        })
      })
    })


  },
};

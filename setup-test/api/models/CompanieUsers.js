/**
 * CompanieUsers.js
 *
 * @description :: TODO: You might write a short summary of how this model works and what it represents here.
 * @docs        :: http://sailsjs.org/documentation/concepts/models-and-orm/models
 */

module.exports = {

  attributes: {
    companies: {
      model: 'companies'
    },
    members: {
      model: 'users'
    },
    title: {
      type: 'string',
      enum: ['manager', 'project manager', 'developer', 'sales', 'support', 'member'],
      defaultsTo: 'member'
    },

    active: {
      type: 'boolean',
      defaultsTo: false
    },
  },

};

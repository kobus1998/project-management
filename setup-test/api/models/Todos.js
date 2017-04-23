/**
 * Todos.js
 *
 * @description :: TODO: You might write a short summary of how this model works and what it represents here.
 * @docs        :: http://sailsjs.org/documentation/concepts/models-and-orm/models
 */

module.exports = {

  attributes: {
    project: {
      collection: 'projects',
      via: 'todos'
    },

    name: {
      type: 'string',
      required: true
    }
  },

  addTodo: (projectId, name, callback) => {
    Todos.create({project: projectId, name: name}).exec((err, result) => {
      callback(err, result)
    })
  }
};

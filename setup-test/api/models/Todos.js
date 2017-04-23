/**
 * Todos.js
 *
 * @description :: TODO: You might write a short summary of how this model works and what it represents here.
 * @docs        :: http://sailsjs.org/documentation/concepts/models-and-orm/models
 */

module.exports = {

  attributes: {
    
    project: {
      model: 'projects'
    },

    name: {
      type: 'string',
      required: true
    },

    done: {
      type: 'boolean',
      defaultsTo: false,
      required: true
    },

    important: {
      type: 'boolean',
      defaultsTo: false,
      required: true
    },

  },

  createTodo: (projectId, data, callback) => {
    Todos.create({
      project: projectId,
      name: data.name,
      done: data.done,
      important: data.important
    }).exec((err, result) => {
      callback(err, result)
    })
  },

  updateTodo: (projectId, todoId, data, callback) => {
    Todos.update({id: todoId}, data).exec((err, result) => {
      callback(err, result)
    })
  },

  deleteTodo: (projectId, todoId, callback) => {
    Todos.destroy({id: todoId, project: projectId}).exec((err, result) => {
      callback(err, result)
    })
  },



};

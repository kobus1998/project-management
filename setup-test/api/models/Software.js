/**
 * Software.js
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
    version: {
      type: 'string'
    },
    desc: {
      type: 'string',
    },
    project: {
      model: 'projects'
    }
  },

  createSoftware: (projectId, data, callback) => {
    Software.create({
      name: data.name,
      desc: data.desc,
      version: data.version,
      project: projectId
    }).exec((err, result) => {
      callback(err, result)
    })
  },

  deleteSoftware: (projectId, softwareId, callback) => {
    Software.destroy({project: projectId, id: softwareId}).exec((err, result) => {
      callback(err, result)
    })
  }

};

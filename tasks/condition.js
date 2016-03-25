'use strict'

const through = require('through2')

module.exports = (condition, next, terminate) => {
  if (condition) {
    return next
  }
  return terminate || through.obj(function (file, encoding, callback) {
    callback(null, file)
  })
}

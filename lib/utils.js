'use strict'

const fs = require('fs')
const path = require('path')
const replace = require('replace-in-file')

const walk = (dir, recursive, done) => {
  let results = []
  fs.readdir(dir, (err, list) => {
    if (err) return done(err)
    let pending = list.length
    if (!pending) return done(null, results)

    list.forEach((file) => {
      file = path.resolve(dir, file)
      fs.stat(file, (err, stat) => {
        if (stat && stat.isDirectory()) {
          if (recursive) {
            walk(file, recursive, (err, res) => {
              results = results.concat(res)
              if (!--pending) done(null, results)
            })
          }
          else {
            if (!--pending) done(null, results)
          }
        }
        else {
          results.push(file)
          if (!--pending) done(null, results)
        }
      })
    })
  })
}

module.exports = {
  getFiles: (folder, recursive, done) => {
    walk(folder, recursive, done)
  },
  replaceInFiles: (files, regex, replacement, done) => {
    replace({
      replace: regex,
      with: replacement,
      files: files
    }, done)
  }
}

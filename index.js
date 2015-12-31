"use strict"

const Trailpack = require('trailpack')
const _ = require('lodash')
const gulp = require('gulp')

module.exports = class Gulp extends Trailpack {

  /**
   * Check gulp config is present
   */
  validate() {
    if (!this.app.config.gulp) {
      return Promise.reject(new Error('There no gulp.js under ./config, check it\'s load in ./config/index.js or create it!'))
    }
    return Promise.resolve()
  }

  /**
   * Load task to gulp
   */
  configure() {
    const config = this.app.config.gulp
    const tasks = config.tasks

    _.each(tasks, (task, taskID) = > {
      gulp.task(taskID, task)
    })

    return Promise.resolve()
  }

  /**
   * Run the default task
   */
  initialize() {
    return new Promise((resolve, reject) = > {
        gulp.run(this.app.config.gulp.defaultTaskName, function (err) {
          if (err) return reject(err)
          resolve()
        })
  })
  }

  constructor(app) {
    super(app, {
      config: require('./config'),
      api: require('./api'),
      pkg: require('./package')
    })
  }
}


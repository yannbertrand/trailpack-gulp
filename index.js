'use strict'

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
    const log = this.app.config.log.logger.info

    _.each(tasks, (task, taskID) => {
      if (_.isArray(task) || _.isFunction(task)) {
        const userTask = task
        //gulp.task(taskID, userTask)

        if (_.isFunction(task)) {
          if (task.length > 0){
            gulp.task(taskID, (done) => {
              log('gulp: running ' + taskID)
              return userTask(done)
            })
          }
          else {
            gulp.task(taskID, () => {
              log('gulp: running ' + taskID)
              return userTask()
            })
          }
        }
        else {
          gulp.task(taskID, userTask)
        }

      }
      else {
        const userTask = task.task
        //gulp.task(taskID, task.dependOf, userTask)

        if (task.task.length > 0) {
          gulp.task(taskID, task.dependOf, (done) => {
            log('gulp: running ' + (task.description || taskID))
            return userTask(done)
          })
        }
        else {
          gulp.task(taskID, task.dependOf, () => {
            log('gulp: running ' + (task.description || taskID))
            return userTask()
          })
        }
      }
    })

    return Promise.resolve()
  }

  /**
   * Run the default task
   */
  initialize() {
    return new Promise((resolve, reject) => {
      gulp.start(this.app.config.gulp.defaultTaskName, (err) => {
        if (err) return reject(err)
        resolve()
      })
    })
  }

  constructor(app) {
    super(app, {
      config: require('./config'),
      pkg: require('./package'),
      utils: require('./lib/utils')
    })
  }
}


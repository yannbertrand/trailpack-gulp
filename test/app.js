'use strict'
const _ = require('lodash')
const smokesignals = require('smokesignals')
const fs = require('fs')

const App = {
  pkg: {
    name: 'gulp-trailpack-test',
    version: '1.0.0'
  },
  config: {
    gulp: {
      defaultTaskName: 'default',
      tasks: {
        default: ['simple'],
        simple: (done) => {
          fs.writeFile('./test/ok', 'It\'s ok!', function (err) {
            done(err)
          })
        }
      }
    },
    main: {
      packs: [
        smokesignals.Trailpack,
        require('../') // trailpack-gulp
      ]
    },
    web: {port: 3000}
  }
}

_.defaultsDeep(App, smokesignals.FailsafeConfig)
module.exports = App

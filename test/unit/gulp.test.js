'use strict'
const assert = require('assert')
const fs = require('fs')

describe('Gulp', () => {
  it('/test/ok file should exist', (done) => {
    fs.exists('./test/ok', function (exists) {
      assert(exists)
      if (exists) {
        fs.unlinkSync('./test/ok')
      }
      done()
    })
  })
})

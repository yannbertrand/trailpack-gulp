'use strict'
const assert = require('assert')
const fs = require('fs')
const path = require('path')
const utils = require('../../lib/utils')

describe('Utils', () => {

  describe('getFiles', () => {
    it('Should return list of files in ./test', (done) => {
      utils.getFiles(path.join(__dirname, '../'), false, (err, files) => {
        assert.equal(files.length, 5)
        done()
      })
    })
    it('Should return list of files in ./test recursively', (done) => {
      utils.getFiles(path.join(__dirname, '../'), true, (err, files) => {
        assert.equal(files.length, 7)
        done()
      })
    })
  })

  describe('replaceInFiles', () => {
    it('Should replace in file', (done) => {
      utils.replaceInFiles(path.join(__dirname, '../ok'), /It's ok!/g, 'It\'s better than ok', (err, files) => {
        if (err) {
          throw err
        }
        fs.readFile(path.join(__dirname, '../ok'), (err, data) => {
          if (err) {
            throw err
          }
          assert.equal(String(data), 'It\'s better than ok')
          done()
        })
      })
    })
  })
})


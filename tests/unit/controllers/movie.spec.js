'use strict'

const {expect} = require('chai')

const movieController = require('../../../controllers/movie.controller')

describe('Controller: Movie', () => {

  it('exists', () => {
    expect(typeof movieController).equals('object')
  })

  describe('getMovie()', () => {
    it('exists', () => {
      expect(typeof movieController.getMovie).equals('function')
    })
  })

  describe('createMovie()', () => {
    it('exists', () => {
      expect(typeof movieController.createMovie).equals('function')
    })
  })

})

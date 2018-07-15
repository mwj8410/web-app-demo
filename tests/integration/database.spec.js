'use strict'

const {expect} = require('chai')

require('../../config/environment')

const sql = require('../../connections/sql')

describe('Connection: Database', () => {

  it('exists', () => {
    expect(typeof sql).equals('object')
  })

  describe('authenticate()', () => {

    after(async () => {
      await sql.close()
    })

    it('exists', () => {
      expect(typeof sql.authenticate).equals('function')
    })

    it('connects to the database', async () => {
      const result = await sql.authenticate()
      expect(result).equals(true)
    })

  })

  describe('close()', () => {

    before(async () => {
      await await sql.authenticate()
    })

    it('exists', () => {
      expect(typeof sql.close).equals('function')
    })

    it('connects to the database', async () => {
      // We could test the connection after this by attempting to fetch something through it
      // However, that really doesn't add much value.
      expect(async () => { await sql.close() }).to.not.throw()
    })

  })

  describe('Entity models', () => {
    let models

    before(async () => {
      await await sql.authenticate()
    })

    after(async () => {
      await sql.close()
    })

    it('getModels() provides a set of models', () => {
      expect(typeof sql.getModels).equals('function')
      models = sql.getModels()
      // console.log(models)
      expect(Object.keys(models).length).equals(1)
    })

    describe('Movie', () => {
      // Notice that these tests are sequential and state based.
      // Remember that these are integration tests, so we are testing the
      // integrety of the connection to the database and matching data structures
      // between the tow systems

      const test_movie_criteria = {title: 'test movie'}

      it('exists and is correctly formed', () => {
        const {Movie} = sql.getModels()

        expect(typeof Movie).equals('function')
        expect(typeof Movie.create).equals('function')
        expect(typeof Movie.findOne).equals('function')
      })

      it('allows the creation of new Movie records', async () => {
        const {Movie} = sql.getModels()

        const movie = await Movie.create(test_movie_criteria)

        // We are not truncating the database and resetting incrementors between test runs,
        // so don't test on id values
        expect(typeof movie.id).equals('number')
        expect(movie.title).equals('test movie')
      })

      it('allows fetching a movie', async () => {
        const {Movie} = sql.getModels()
        const movie = await Movie.findOne({ where: test_movie_criteria})

        expect(typeof movie.id).equals('number')
        expect(movie.title).equals('test movie')
      })

    })

  })

})

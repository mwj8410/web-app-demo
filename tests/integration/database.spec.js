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

})

'use strict'

const Phlog = require('@phaesynthe/phlog')

const {Movie} = require('../connections/sql').getModels()

const log = new Phlog('Movie Controller')

module.exports = {
  createMovie,
  getMovie,
  listByUser
}

async function createMovie(id_user, movie) {
  log.activity('createMovie', `listing movies for ${id_user}`)
  return await Movie.create(Object.assign({}, movie, { id_user } ))
}

async function getMovie(id_user, id_movie) {
  log.activity('getMovie', `listing movies for ${id_user}`)
  return await Movie.findOne({ where: { id: id_movie, id_user }})
}

async function listByUser(id_user) {
  log.activity('listByUser', `listing movies for ${id_user}`)
  return Movie.find({ where: { id_user }})
}

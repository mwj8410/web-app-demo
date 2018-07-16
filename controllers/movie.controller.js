'use strict'

const Phlog = require('@phaesynthe/phlog')

const {Movie} = require('../connections/sql').getModels()

const log = new Phlog('Movie Controller')

module.exports = {
  createMovie,
  getMovie,
  listByUser,
  updateMovie
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
  return await Movie.findAll({ where: { id_user }})
}

async function updateMovie(id_user, id_movie, movie) {
  log.activity('updateMovie', `user ${id_user} updating movie ${id_movie}`)
  // ToDo: filter out read-only properties
  const result = await Movie.update(movie, { where: { id: id_movie, id_user }})
  return result
}

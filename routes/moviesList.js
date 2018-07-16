'use strict'

const Phlog = require('@phaesynthe/phlog')

const {listByUser} = require('../controllers/movie.controller')

const log = new Phlog('Route')

module.exports = {
  uri: '/user/:id_user/movies/list',
  method: 'GET',
  handler: listMovies
}

async function listMovies(req, res) {
  const { id_user } = req.params
  log.activity('listMovies', `request to list for user ${id_user}`)

  try {
    const result = await listByUser(id_user)
    return res.status(200).send(result)
  } catch (err) {
    return res.status(500).send('API encountered an error. This is likely a 422.')
  }
}

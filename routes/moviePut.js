'use strict'

const Phlog = require('@phaesynthe/phlog')

const {updateMovie} = require('../controllers/movie.controller')

const log = new Phlog('Route')

module.exports = {
  uri: '/user/:id_user/movie/:id_movie',
  method: 'PUT',
  handler: putMovie
}

async function putMovie(req, res) {
  const { id_user, id_movie } = req.params
  log.activity('putMovie', `request to Update movie for user ${id_user}`)

  try {
    const result = await updateMovie(id_user, id_movie, req.body)
    return res.status(200).send(result)
  } catch (err) {
    return res.status(500).send('API encountered an error. This is likely a 422.')
  }
}

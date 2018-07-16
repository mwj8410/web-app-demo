'use strict'

const Phlog = require('@phaesynthe/phlog')

const {createMovie} = require('../controllers/movie.controller')

const log = new Phlog('Route')

module.exports = {
  uri: '/user/:id_user/movie/',
  method: 'POST',
  handler: postMovie
}

async function postMovie(req, res) {
  const { id_user } = req.params
  log.activity('moviePost', `request to Post movie for user ${id_user}`)

  try {
    const result = await createMovie(id_user, req.body)
    return res.status(200).send(result)
  } catch (err) {
    return res.status(500).send('API encountered an error. This is likely a 422.')
  }
}

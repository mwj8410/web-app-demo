'use strict'

const Sequelize = require('sequelize')

const {DB_HOST, DB_PASS, DB_USER} = process.env

const movieBuilder = require('./models/Movie.model')

const models = {
  Movie: undefined
}

let sequelize

module.exports = {
  authenticate,
  close,
  getModels
}

async function authenticate() {
  // Placing this here so the connection can be closed and reestablished.
  // this is mainly useful in automated testing
  sequelize = new Sequelize('postgres', DB_USER, DB_PASS, {
    dialect: 'postgres',
    host: DB_HOST,
    logging: false,
    operatorsAliases: false,

    pool: {
      max: 5,
      min: 0,
      acquire: 30000,
      idle: 10000
    }
  })

  try {
    await sequelize.authenticate()
    await sequelize.query('CREATE SCHEMA IF NOT EXISTS web_app_demo;')

    models.Movie = movieBuilder(sequelize)

    await models.Movie.sync()
    return true
  } catch (err) {
    console.error('Failed to establish database connection')
    console.error(err)
    return false
  }
}

async function close() {
  return await sequelize.close()
}

function getModels() {
  return models
}

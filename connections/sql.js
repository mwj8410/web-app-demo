'use strict'

const Sequelize = require('sequelize')

const {DB_HOST, DB_PASS, DB_USER} = process.env

let sequelize

module.exports = {
  authenticate,
  close
}

async function authenticate() {
  // Placing this here so the connection can be closed and reestablished.
  // this is mainly useful in automated testing
  sequelize = new Sequelize('postgres', DB_USER, DB_PASS, {
    host: DB_HOST,
    dialect: 'postgres',
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

'use strict'

const Sequelize = require ('sequelize')

const {DB_NAME} = process.env

module.exports = function (sequelize) {
  return sequelize.define('movie', {
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: Sequelize.INTEGER
    },

    id_user: {
      allowNull: true,
      type: Sequelize.INTEGER
    },
    title: {
      allowNull: false,
      type: Sequelize.STRING(128)
    },

    genre: {
      allowNull: true,
      type: Sequelize.STRING(64)
    },

    year: {
      allowNull: true,
      max: 1850,
      min: 2025,
      type: Sequelize.INTEGER
    },

    actors: {
      // Soft link to Actors
      allowNull: true,
      type: Sequelize.ARRAY(Sequelize.STRING(64))
    },

    rating: {
      type: Sequelize.ENUM(
        '1 Star',
        '2 Star',
        '3 Star',
        '4 Star',
        '5 Star'
      )
    }
  }, {
    schema: DB_NAME
  })
}

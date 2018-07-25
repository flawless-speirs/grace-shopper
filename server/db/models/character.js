const Sequelize = require('sequelize')
const db = require('../db')

const Character = db.define('character', {
  name: {
    type: Sequelize.STRING,
    unique: true,
    allowNull: false
  },
  imageUrl: {
    type: Sequelize.STRING,
    unique: true,
    allowNull: false
  },
  description: {
    type: Sequelize.TEXT,
    unique: true,
    allowNull: false
  },
  price: {
    type: Sequelize.DOUBLE,
    unique: true,
    allowNull: false
  }
})

module.exports = Character

const Sequelize = require('sequelize');
const db = require('../db');

const Order = db.define('order', {
  amount: {
    type: Sequelize.FLOAT,
    allowNull: true,
  },
  sent: {
    type: Sequelize.BOOLEAN,
    defaultValue: false,
  },
  received: {
    type: Sequelize.BOOLEAN,
    defaultValue: false,
  },
});

module.exports = Order;

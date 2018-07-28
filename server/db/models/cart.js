const Sequelize = require('sequelize');
const db = require('../db');

const Cart = db.define('cart', {
  productId: {
    type: Sequelize.INTEGER,
    allowNull: false,
  },
  quantity: {
    type: Sequelize.INTEGER,
    allowNull: false,
  },
  ordered: {
    type: Sequelize.BOOLEAN,
    defaultValue: false,
  },
});

module.exports = Cart;

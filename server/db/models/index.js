const User = require('./user');
const Product = require('./product');
const Cart = require('./cart');
const Order = require('./order');
const Tag = require('./tag');

User.hasMany(Cart);
Order.hasMany(Cart);
Order.belongsTo(User);
User.hasMany(Order);

Product.belongsToMany(Tag, { through: 'product-tag' });
Tag.belongsToMany(Product, { through: 'product-tag' });

module.exports = {
  User,
  Product,
  Cart,
  Order,
  Tag,
};

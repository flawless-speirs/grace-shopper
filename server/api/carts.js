const router = require('express').Router();
const { Cart } = require('../db/models');
module.exports = router;

router.get('/', async (req, res, next) => {
  try {
    const userId = req.user.id;
    const cart = await Cart.findAll({ where: { userId } });
    res.json(cart);
  } catch (err) {
    next(err);
  }
});

router.put('/', async (req, res, next) => {
  try {
    console.log('USER:', req.user);
    console.log('CART:', req.body);
    const userId = req.user.id;
    const newCart = req.body;
    await Cart.findAll({ where: { userId } });
    await newCart.forEach(async productData => {
      await Cart.findOne({ where: { userId, productId: productData[0] } }).then(
        product => {
          if (product) {
            const quantity = productData[1] + product.quantity;
            product.update({ quantity });
          } else {
            Cart.create({
              userId,
              productId: productData[0],
              quantity: productData[1],
            });
          }
        }
      );
    });
  } catch (err) {
    next(err);
  }
});

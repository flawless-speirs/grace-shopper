const router = require('express').Router();
const { Cart } = require('../db/models');
module.exports = router;

router.get('/', async (req, res, next) => {
  try {
    if (req.user) {
      const userId = req.user.id;
      const cart = await Cart.findAll({ where: { userId } });
      res.json(cart);
    }
  } catch (err) {
    next(err);
  }
});

router.put('/', async (req, res, next) => {
  try {
    const userId = req.user.id;
    const newCart = req.body;
    await newCart.forEach(async productData => {
      await Cart.findOne({ where: { userId, productId: productData[0] } }).then(
        product => {
          if (product) {
            product.update({ quantity: productData[1] });
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
    res.status(204).end();
  } catch (err) {
    next(err);
  }
});

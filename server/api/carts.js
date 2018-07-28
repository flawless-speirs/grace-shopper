const router = require('express').Router();
const { Cart } = require('../db/models');
module.exports = router;

router.get('/', async (req, res, next) => {
  try {
    if (req.session.cart) {
      console.log('getting from SESSION');
      res.json(req.session.cart);
    } else if (req.user) {
      const cart = await Cart.findAll({ where: { userId: req.user.id } });
      req.session.cart = cart.data;
      res.json(cart);
    } else {
      req.session.cart = [];
      res.json(req.session.cart);
    }
  } catch (err) {
    next(err);
  }
});

router.put('/', async (req, res, next) => {
  try {
    const userId = req.user.id;
    const newCart = req.body;
    await newCart.forEach(async product => {
      if (product.quantity) {
        await Cart.findOne({
          where: { userId, productId: product.productId },
        }).then(response => {
          if (response) {
            response.update({ quantity: product.quantity });
          } else {
            Cart.create({
              userId,
              productId: product.productId,
              quantity: product.quantity,
            });
          }
        });
      }
    });
    res.status(204).end();
  } catch (err) {
    next(err);
  }
});

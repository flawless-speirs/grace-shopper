const router = require('express').Router();
const { Cart } = require('../db/models');
module.exports = router;

router.get('/', async (req, res, next) => {
  try {
    if (req.session.cart && req.session.cart.length) {
      console.log('getting from SESSION');
      res.json(req.session.cart);
    } else if (req.user) {
      const cart = await Cart.findAll({ where: { userId: req.user.id } });
      req.session.cart = cart.data;
      res.json(cart);
    } else {
      req.session.cart = [];
      req.session.total = 0;
      res.json(req.session.cart);
    }
  } catch (err) {
    next(err);
  }
});

router.put('/', async (req, res, next) => {
  try {
    if (req.user) {
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
    } else {
      req.session.cart = req.body;
      res.sendStatus(200);
    }
  } catch (err) {
    next(err);
  }
});

router.put('/session', (req, res, next) => {
  req.session.cart = req.body.cart;
  req.session.total = req.body.total;
  res.sendStatus(200);
});

const router = require('express').Router();
const { Cart } = require('../db/models');
module.exports = router;

router.get('/', async (req, res, next) => {
  try {
    if (req.session.cart && req.session.cart.length) {
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
          // if item has no quantity, don't add to db
          await Cart.findOne({
            where: { userId, productId: product.productId, orderId: null },
          }).then(response => {
            if (response) {
              // if instance already exists
              if (product.orderId) {
                // if submitting an order
                response.update({
                  quantity: product.quantity,
                  orderId: product.orderId,
                });
              } else {
                // if saving a pending cart
                response.update({ quantity: product.quantity });
              }
            } else {
              // if no instance exists
              if (product.orderId) {
                // if submitting an order
                Cart.create({
                  userId,
                  productId: product.productId,
                  quantity: product.quantity,
                  orderId: product.orderId,
                });
              } else {
                // if saving a pending cart
                Cart.create({
                  userId,
                  productId: product.productId,
                  quantity: product.quantity,
                });
              }
            }
          });
        }
        res.status(200).end();
      });
    } else {
      // if no user is logged on, add cart to session
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

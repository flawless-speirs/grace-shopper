const router = require('express').Router();
const { Cart } = require('../db/models');
module.exports = router;

router.get('/', async (req, res, next) => {
  try {
    let cart = [];
    if (req.session.cart && req.session.cart.length) {
      cart = req.session.cart;
    }
    if (req.user) {
      const userCart = await Cart.findAll({ where: { userId: req.user.id } });
      userCart.forEach(item => {
        const existing = cart.find(thing => thing.productId === item.productId);
        if (existing) {
          existing.quantity = existing.quantity + item.quantity;
        } else {
          cart.push(item);
        }
      });
      req.session.cart = cart;
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

router.get('/session', (req, res, next) => {
  try {
    res.json(req.session.cart);
  } catch (err) {
    next(err);
  }
});

router.put('/', async (req, res, next) => {
  try {
    if (req.user && req.body.length) {
      const userId = req.user.id;
      const newCart = req.body;
      await newCart.forEach(product => {
        Cart.findOne({
          where: { userId, productId: product.productId, orderId: null },
        }).then(response => {
          if (response) {
            // if instance already exists
            if (product.orderId) {
              // if submitting an order
              return response.update({
                quantity: product.quantity,
                orderId: product.orderId,
              });
            } else {
              // if saving a pending cart
              return response.update({ quantity: product.quantity });
            }
          } else {
            // if no instance exists
            if (product.quantity) {
              // if item has no quantity, don't add to db
              if (product.orderId) {
                // if submitting an order
                return Cart.create({
                  userId,
                  productId: product.productId,
                  quantity: product.quantity,
                  orderId: product.orderId,
                });
              } else {
                // if saving a pending cart
                return Cart.create({
                  userId,
                  productId: product.productId,
                  quantity: product.quantity,
                });
              }
            }
          }
        });
        res.status(200).end();
      });
    } else {
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

const router = require('express').Router();
const { Cart } = require('../db/models');
module.exports = router;

router.get('/', async (req, res, next) => {
  try {
    // if the user is logged in then pull their cart from the database
    if (req.user) {
      const userId = req.user.id;
      const cart = await Cart.findAll({ where: { userId } });

      let cartState = [];
      cart.forEach(item => {
        cartState.push({ productId: item.productId, quantity: item.quantity });
      });

      res.json(cartState);
    } else {
      // if the user is not logged in then pull their cart from the session store
      // if the session.cart is empty then return an empty array
      if (req.session.cart === undefined) {
        req.session.cart = [];
      }
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

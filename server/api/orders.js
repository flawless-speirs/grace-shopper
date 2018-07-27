const router = require('express').Router();
const { Order } = require('../db/models');
module.exports = router;

router.post('/', async (req, res, next) => {
  try {
    let userId;
    if (req.user) {
      userId = req.user.id;
    } else {
      userId = null;
    }
    const created = await Order.create({
      userId,
      amount: req.body.amount,
    });
    res.send(created);
  } catch (err) {
    next(err);
  }
});

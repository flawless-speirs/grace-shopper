const router = require('express').Router();
const { Order } = require('../db/models');
module.exports = router;

router.post('/', async (req, res, next) => {
  try {
    console.log(req.body);
    const created = await Order.create({
      userId: req.user.id,
      amount: req.body.amount,
    });
    res.send(created);
  } catch (err) {
    next(err);
  }
});

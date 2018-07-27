const router = require('express').Router();
const { Order } = require('../db/models');
module.exports = router;

router.post('/', async (req, res, next) => {
  try {
    const user = req.user;
    const request = req.body;
    let order = {};
    const created = await Order.create({ userId: user.id });
    res.send(created);
  } catch (err) {
    next(err);
  }
});

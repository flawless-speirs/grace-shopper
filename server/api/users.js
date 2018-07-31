const router = require('express').Router();
const { User, Product, Order } = require('../db/models');
module.exports = router;

router.get('/', async (req, res, next) => {
  console.log('HITTING GET ROUTE');
  try {
    const users = await User.findAll({
      // explicitly select only the id and email fields - even though
      // users' passwords are encrypted, it won't help if we just
      // send everything to anyone who asks!
      attributes: ['id', 'email'],
    });
    res.json(users);
  } catch (err) {
    next(err);
  }
});

router.get('/:id', async (req, res, next) => {
  console.log('HITTING GET ROUTE');
  try {
    const user = await User.findById(req.params.id, {
      include: [Order],
      attributes: ['id', 'email'],
    });
    res.json(user);
  } catch (err) {
    next(err);
  }
});

router.put('/:id', async (req, res, next) => {
  try {
    console.log('HITTING PUT ROUTE');
    const user = await User.findById(req.params.id);
    if (user.correctPassword(req.body.currentPassword)) {
      await user.update({
        password: req.body.newPassword,
      });
      res.status(204);
      res.send('Change made');
    } else if (!user.correctPassword(req.body.currentPassword)) {
      res.statusMessage = 'Current password does not match';
      res.status(490);
    }
  } catch (err) {
    next(err);
  }
});

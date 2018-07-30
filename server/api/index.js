const router = require('express').Router();

module.exports = router;

router.use('/', (req, res, next) => {
  if (!req.headers['referer']) {
    res.status(500).send('Unauthorized Access');
  }
  next();
});

router.use('/users', require('./users'));

router.use('/products', require('./products'));

router.use('/carts', require('./carts'));

router.use('/orders', require('./orders'));

router.use((req, res, next) => {
  const error = new Error('Not Found');
  error.status = 404;
  next(error);
});

const router = require('express').Router();

module.exports = router;

router.use('/', (req, res, next) => {
  console.log('REQUEST HEADERS: ', req.headers);
  const error = new Error('Unauthorized Access');
  error.status = 404;
  if (!req.headers['referer']) {
    next(error);
  } else if (req.headers.host !== 'localhost:8080') {
    next(error);
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

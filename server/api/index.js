const router = require('express').Router();

module.exports = router;

router.use('/', (req, res, next) => {
  console.log('REQUEST HEADERS: ', req.headers);
  const error = new Error('Unauthorized Access');
  error.status = 500;
  if (!req.headers['referer']) {
    next(error);
  } else {
    if (
      // req.headers['referer'].indexOf('127.0.0.1') < 0 &&
      req.headers['referer'].indexOf('localhost:8080') < 0 &&
      req.headers['referer'].indexOf('rickandmortystore.herokuapp.com') < 0
    ) {
      console.log('referer error');
      next(error);
    }
  }
  if (!req.headers.host) {
    next(error);
  } else {
    if (
      req.headers.host.indexOf('127.0.0.1') < 0 &&
      req.headers.host.indexOf('localhost:8080') < 0 &&
      req.headers.host.indexOf('rickandmortystore.herokuapp.com') < 0
    ) {
      console.log('host error');
      next(error);
    }
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

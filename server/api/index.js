const router = require('express').Router();
const connectEnsureLogin = require('connect-ensure-login');
const passport = require('passport');

module.exports = router;

router.use(
  '/',
  // passport.authenticate('basic', { session: false }),
  (req, res, next) => {
    if (!req.headers['referer']) {
      res.status(500).send('Unauthorized Access');
    }
    next();
  }
);

router.use(
  '/users',
  passport.authenticate('basic', { session: false }),
  require('./users')
);

router.use('/products', require('./products'));

router.use('/carts', require('./carts'));

router.use('/orders', require('./orders'));

router.use((req, res, next) => {
  const error = new Error('Not Found');
  error.status = 404;
  next(error);
});

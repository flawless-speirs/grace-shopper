const router = require('express').Router();
const passport = require('passport');
module.exports = router;

router.use(
  '/',
  passport.authenticate('basic', { session: false }),
  (req, res, next) => {
    next();
  }
),
  router.use('/users', require('./users'));

router.use('/products', require('./products'));

router.use((req, res, next) => {
  const error = new Error('Not Found');
  error.status = 404;
  next(error);
});

const router = require('express').Router();
const passport = require('passport');

module.exports = router;

router.use('/', (req, res, next) => {
  if (!req.headers['referer']) {
    res.status(500).send('Unauthorized Access');
  }
  next();
});

router.use(
  '/users',
  passport.authenticate('basic', { session: false }),
  require('./users')
);

router.use((req, res, next) => {
  const error = new Error('Not Found');
  error.status = 404;
  next(error);
});

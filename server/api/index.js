const router = require('express').Router();
const connectEnsureLogin = require('connect-ensure-login');
module.exports = router;

router.use(
  '/',
  // () => {
  //   connectEnsureLogin.ensureLoggedIn();
  // },
  (req, res, next) => {
    console.log('REQUEST: ', req);
    console.log('HEADERS: ', req.headers);
    // console.log('PASSPORT STRATEGIES: ',req.);
    next();
  }
);

router.use('/users', require('./users'));

router.use('/products', require('./products'));

router.use((req, res, next) => {
  const error = new Error('Not Found');
  error.status = 404;
  next(error);
});

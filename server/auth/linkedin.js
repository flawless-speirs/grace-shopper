const passport = require('passport');
const router = require('express').Router();
const LinkedInStrategy = require('passport-linkedin-oauth2').Strategy;
const { User } = require('../db/models');
module.exports = router;

const LinkedInConfig = {
  clientID: '77s5n75yjk4f4z',
  clientSecret: 'hCY7zZhf2Hd9UdrX',
  callbackURL: 'http://localhost:8080/auth/linkedin/callback',
  state: true,
};

const strategy = new LinkedInStrategy(
  LinkedInConfig,
  (token, refreshToken, profile, done) => {
    const linkedinId = profile.id;
    const name = profile.displayName;
    const email = 'contact@linkedin.com';

    User.findOrCreate({
      where: { linkedinId },
      defaults: { name, email },
    })
      .then(([user]) => done(null, user))
      .catch(done);
  }
);

passport.use(strategy);

router.get('/', passport.authenticate('linkedin'));

router.get(
  '/callback',
  passport.authenticate('linkedin', {
    successRedirect: '/home',
    failureRedirect: '/login',
  })
);

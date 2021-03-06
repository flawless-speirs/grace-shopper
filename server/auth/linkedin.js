const passport = require('passport');
const router = require('express').Router();
const LinkedInStrategy = require('passport-linkedin-oauth2').Strategy;
const { User } = require('../db/models');
module.exports = router;

const LinkedInConfig = {
  clientID: process.env.LINKEDIN_CLIENT_ID,
  clientSecret: process.env.LINKEDIN_CLIENT_SECRET,
  callbackURL: process.env.LINKEDIN_CALLBACK,
  state: true,
};

if (!process.env.LINKEDIN_CLIENT_ID || !process.env.LINKEDIN_CLIENT_SECRET) {
  console.log('Linkedin client ID / secret not found. Skipping Google OAuth.');
} else {
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
      successRedirect: '/account',
      failureRedirect: '/login',
    })
  );
}

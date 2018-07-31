const passport = require('passport');
const router = require('express').Router();
const GitHubStrategy = require('passport-github');
const { User } = require('../db/models');
module.exports = router;

const githubConfig = {
  clientID: process.env.GITHUB_CLIENT_ID,
  clientSecret: process.env.GITHUB_CLIENT_SECRET,
  callbackURL: process.env.GITHUB_CALLBACK,
};

if (!process.env.GITHUB_CLIENT_ID || !process.env.GITHUB_CLIENT_SECRET) {
  console.log('Github client ID / secret not found. Skipping Google OAuth.');
} else {
  const strategy = new GitHubStrategy(
    githubConfig,
    (token, refreshToken, profile, done) => {
      // console.log('PROFILE: ', profile.displayName);
      const githubId = profile.id;
      const name = profile.username;
      const email = 'contact@github.com';

      User.findOrCreate({
        where: { githubId },
        defaults: { name, email },
      })
        .then(([user]) => done(null, user))
        .catch(done);
    }
  );

  passport.use(strategy);

  router.get('/', passport.authenticate('github', { scope: 'email' }));

  router.get(
    '/callback',
    passport.authenticate('github', {
      successRedirect: '/account',
      failureRedirect: '/login',
    })
  );
}

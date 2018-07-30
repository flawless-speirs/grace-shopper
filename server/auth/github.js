const passport = require('passport');
const router = require('express').Router();
const GitHubStrategy = require('passport-github');
const { User } = require('../db/models');
module.exports = router;

const githubConfig = {
  clientID: 'e813c76855eb3b13732b',
  clientSecret: '469f0aff8ef7cf9d9f587cf69616b15fb005b0f5',
  callbackURL: 'https://rickandmortystore.herokuapp.com/auth/github/callback',
};

const strategy = new GitHubStrategy(
  githubConfig,
  (token, refreshToken, profile, done) => {
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
    successRedirect: '/home',
    failureRedirect: '/login',
  })
);

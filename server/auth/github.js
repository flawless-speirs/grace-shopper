const passport = require('passport');
const router = require('express').Router();
const GitHubStrategy = require('passport-github');
const { User } = require('../db/models');
module.exports = router;

const githubConfig = {
  clientID: 'e813c76855eb3b13732b',
  clientSecret: '469f0aff8ef7cf9d9f587cf69616b15fb005b0f5',
  callbackURL: 'http://localhost:8080/auth/github/callback',
};

const strategy = new GitHubStrategy(
  githubConfig,
  (token, refreshToken, profile, done) => {
    const githubId = profile.id;
    const name = profile.username;
    console.log('PROFILE!', profile);
    // const email = profile.emails[0].value || '';
    const email = 'fdterr@email.com';
    console.log('CREATE', name, email);

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

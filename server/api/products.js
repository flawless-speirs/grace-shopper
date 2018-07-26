const router = require('express').Router();
const { Product } = require('../db/models');
const GoogleStrategy = require('passport-google-oauth').OAuth2Strategy;
const Strategy = require('passport-http').BasicStrategy;
module.exports = router;

router.get('/', async (req, res, next) => {
  console.log('USER: ', req.user);
  try {
    const products = await Product.findAll();
    res.json(products);
  } catch (err) {
    next(err);
  }
});

router.get('/:id', async (req, res, next) => {
  try {
    const product = await Product.findById(req.params.id);
    res.json(product);
  } catch (err) {
    next(err);
  }
});

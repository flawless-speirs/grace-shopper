const router = require('express').Router()
const {Character} = require('../db/models')
module.exports = router

router.get('/', async (req, res, next) => {
  try {
    const characters = await Character.findAll()
    res.json(characters)
  } catch (err) {
    next(err)
  }
})

const router = require('express').Router()
const {User, Product} = require('../db/models')
module.exports = router

router.get('/', async (req, res, next) => {
  try {
    const users = await User.findAll({
      // explicitly select only the id and email fields - even though
      // users' passwords are encrypted, it won't help if we just
      // send everything to anyone who asks!
      attributes: ['id', 'email']
    })
    res.json(users)
  } catch (err) {
    next(err)
  }
})

router.get('/logged-in', async (req, res, next) => {
  try {
    console.log(req.session)
    res.send(req.session)
  } catch (err) {
    next(err)
  }
})

router.get('/:id', async (req, res, next) => {
  try {
    const user = await User.findOne({where: { id: req.params.id }, include: [Product] })
    res.json(user)
  } catch (err) {
    next(err)
  }
})

router.put('/:id', async (req, res, next) => {
  try {
    const user = await User.findById(req.params.id)
    await user.update(req.body)
    res.sendStatus(204)
  } catch (err) {
    next(err)
  }
})

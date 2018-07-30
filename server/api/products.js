const router = require('express').Router();
const { Product, Tag } = require('../db/models');
module.exports = router;

router.get('/', async (req, res, next) => {
  try {
    const products = await Product.findAll({
      include: { model: Tag, through: { attributes: [] } },
    });
    res.json(products);
  } catch (err) {
    next(err);
  }
});

router.get('/:id', async (req, res, next) => {
  try {
    const product = await Product.findById(req.params.id, { include: [Tag] });
    res.json(product);
  } catch (err) {
    next(err);
  }
});

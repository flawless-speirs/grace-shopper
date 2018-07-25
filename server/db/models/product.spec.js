const chai = require('chai')
const expect = chai.expect
const chaiThings = require('chai-things')
chai.use(chaiThings)
const db = require('../index')
const Product = db.model('product')

describe('Product Model Test', () => {
  describe('Product model', () => {
    describe('Validations', () => {
      it('requires name', async () => {
        const product = Product.build()

        try {
          await product.validate()
          throw Error(
            'validation was successful but should have failed without `name`'
          )
        } catch (err) {
          expect(err.message).to.contain('name cannot be null')
        }
      })
    })
  })
})

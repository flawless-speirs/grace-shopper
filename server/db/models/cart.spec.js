const chai = require('chai');
const expect = chai.expect;
const chaiThings = require('chai-things');
chai.use(chaiThings);
const db = require('../index');
const Cart = db.model('cart');

describe('Cart Model Test', () => {
  describe('Cart Model', () => {
    it('Cart Validations ', async () => {
      try {
        const cart = Cart.build();
        await cart.validate();
        throw Error(
          'Validation was successful but should have failed without `productId` and `quantity`'
        );
      } catch (err) {
        expect(err.message).to.contain('notNull Violation');
      }
    });
  });
});

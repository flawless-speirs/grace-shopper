const chai = require('chai');
const expect = chai.expect;
const chaiThings = require('chai-things');
chai.use(chaiThings);
const db = require('../index');
const Order = db.model('order');

describe('Order Model Test', () => {
  describe('Order Model', () => {
    it('Order instances should have proper types and default values', async () => {
      try {
        const order = await Order.build({});
        expect(order.sent).to.equal(false);
        expect(order.received).to.equal(false);
      } catch (err) {
        expect(err.message).to.contain('sent and received should be false');
      }
    });
  });
});

/* global describe beforeEach it */

const { expect } = require('chai');
const request = require('supertest');
const db = require('../db');
const app = require('../index');
const Order = db.model('order');

describe('Order routes', () => {
  beforeEach(() => {
    return db.sync({ force: true });
  });

  describe('/api/orders/', () => {
    const codysEmail = 'cody@puppybook.com';

    beforeEach(() => {
      return Order.create({});
    });

    it('can POST an empty order', async () => {
      const res = await request(app)
        .post('/api/orders', {})
        .expect(200);

      expect(res.body).to.be.an('object');
      // expect(res.body[0].email).to.be.equal(codysEmail)
    });
  }); // end describe('/api/users')
}); // end describe('User routes')

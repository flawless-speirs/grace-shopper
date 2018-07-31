/* global describe beforeEach it */

const { expect } = require('chai');
const request = require('supertest');
const db = require('../db');
const app = require('../index');
const Order = db.model('order');
const User = db.model('user');

describe('Order routes', () => {
  beforeEach(() => {
    return db.sync({ force: true });
  });

  describe('/api/orders/', () => {
    const codysEmail = 'cody@puppybook.com';

    beforeEach(() => {
      return User.create({
        email: 'rick@email.com',
        password: '123',
      });
    });

    it('can POST an empty order', async () => {
      const res = await request(app)
        .post('/api/orders', {})
        .set('referer', 'http://locahost:8080')
        .expect(200);

      // expect(res.user).to.be.an('object');
      expect(res.body.userId).to.be.null;
      expect(res.body.amount).to.be.null;
    });

    const body = { email: 'rick@email.com', password: '123' };
    it('can post a NON-EMPTY order', async () => {
      const loginRes = await request(app)
        .post('/auth/login')
        .send(body);
      const res = await request(app)
        .post('/api/orders')
        .send({ amount: 5 })
        .set('referer', 'http://localhost:8080')
        .expect(200);

      expect(res.body.id).to.be.equal(1);
      expect(res.body.amount).to.be.equal(5);
    });
  });
});

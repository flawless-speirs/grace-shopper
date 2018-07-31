/* global describe beforeEach it */

const { expect } = require('chai');
const request = require('supertest');
const db = require('../db');
const app = require('../index');
const User = db.model('user');

describe('Order routes', () => {
  beforeEach(() => {
    return db.sync({ force: true });
  });

  describe('/api/products/', () => {
    beforeEach(() => {
      return User.create({
        email: 'rick@email.com',
        password: '123',
      });
    });

    it('responds with an array via JSON', async () => {
      const res = await request(app)
        .get('/api/products')
        .set('referer', 'http://locahost:8080')
        .expect('Content-Type', /json/)
        .expect(200);

      expect(res.body).to.be.an.instanceOf(Array);
      expect(res.body).to.have.length(0);
    });
  });
});

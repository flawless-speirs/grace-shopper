/* global describe beforeEach it */

const { expect } = require('chai');
const request = require('supertest');
const db = require('../db');
const app = require('../index');
const User = db.model('user');

describe('User routes', () => {
  beforeEach(() => {
    return db.sync({ force: true });
  });

  describe('/api/users/', () => {
    beforeEach(() => {
      return User.create({
        email: 'rick@email.com',
        password: '123',
      });
    });

    it('will be unable to request API routes', async () => {
      return await request(app)
        .get('/api/users')
        .expect(500);
    });

    it('GET /api/users when requesting with a header', async () => {
      const res = await request(app)
        .get('/api/users')
        .set('referer', 'http://localhost:8080')
        .expect(200);

      expect(res.body).to.be.an('array');
    });

    it('will login with the correct username/password combo', async () => {
      const loginRes = await request(app)
        .post('/auth/login')
        .send({ email: 'rick@email.com', password: '123' });

      expect(loginRes.body.id).to.not.be.null;
      expect(loginRes.body.id).to.be.equal(1);
    });
  }); // end describe('/api/users')
}); // end describe('User routes')

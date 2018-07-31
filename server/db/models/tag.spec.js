const chai = require('chai');
const expect = chai.expect;
const chaiThings = require('chai-things');
chai.use(chaiThings);
const db = require('../index');
const Tag = db.model('tag');

describe('Tag Model Test', () => {
  describe('Tag model', () => {
    it('tagName is a string', async () => {
      const tag = await Tag.build({ tagName: 'test' });
      try {
        expect(tag.tagName).to.be.a('string');
      } catch (err) {
        expect(err.message).to.contain('tagName must be a string');
      }
    });
  });
});

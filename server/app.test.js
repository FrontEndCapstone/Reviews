const request = require('supertest');
const { expect } = require('chai');
const app = require('./app.js');

describe('Server basics', () => {
  it('should return 200 for a basic request', done => {
    request(app)
      .get('/')
      .then(response => {
        expect(response.statusCode).to.equal(200);
        done();
      });
  });
});

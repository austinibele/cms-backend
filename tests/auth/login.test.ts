import {expect} from 'chai';
import request from 'supertest';
const server = require('../../server');

describe('POST /api/login', () => {

const params = {
    phoneNumber: '',
    email: 'test@test.com',
    password: 'test'
};

const expectedStatusCode = 200;
it('should login a user and return a token', (done) => {
  request(server)
    .post('/api/login')
    .send(params)
    .expect('Content-Type', /json/)
    .expect(expectedStatusCode)
    .end((err, res) => {
      expect(res.body).to.have.property('user_id');
      expect(res.body).to.have.property('email');
      expect(res.body).to.have.property('paid');
      expect(res.body).to.have.property('isAdmin');
      expect(res.body).to.have.property('token');
      done();
    });
});

// Add more tests for failure scenarios, such as incorrect username/password
});

after(() => {
  server.close();
 });
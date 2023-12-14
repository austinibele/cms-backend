import { expect } from "chai";
import request from "supertest";
const server = require("../../server");
const { v4: uuidv4 } = require('uuid');

const testName = 'POST /api/signUp';
describe(testName, () => {
//////////////////////////
// Test Sign Up with Email
//////////////////////////
const params1 = {
    phoneNumber: '',
    email: uuidv4().slice(0, 10) + '@test.com',
    password: 'test'
};

const expectedStatusCode = 200;
it('Should sign up a new user', (done) => {
  request(server)
    .post('/api/signUp')
    .send(params1)
    .expect('Content-Type', /json/)
    .expect(expectedStatusCode)
    .end((err, res) => {
      if (err) {
        if (res.status !== expectedStatusCode) {
          console.log('|///////////////////////////')
          console.log(`****** ${testName} ******`)
          console.error(res.status, res.body.message);
          console.log('\\\\\\\\\\\\\\\\\\\\\\\\\\\\|')  
        }
        return done(err);
      }
      expect(res.body).to.have.property('user_id');
      expect(res.body).to.have.property('email');
      expect(res.body).to.have.property('paid');
      expect(res.body).to.have.property('token');
      done();
    });
});

//////////////////////////
// Test Sign Up with Phone Number
//////////////////////////
const params2 = {
    phoneNumber: Math.floor(Math.random() * 10000000000).toString(),
    email: '',
    password: 'test'
};

const expectedStatusCode2 = 200;
it('Should sign up a new user', (done) => {
  request(server)
    .post('/api/signUp')
    .send(params2)
    .expect('Content-Type', /json/)
    .expect(expectedStatusCode2)
    .end((err, res) => {
      if (err) {
        if (res.status !== expectedStatusCode2) {
          console.log('|///////////////////////////')
          console.log(`****** ${testName} ******`)
          console.error(res.status, res.body.message);
          console.log('\\\\\\\\\\\\\\\\\\\\\\\\\\\\|')  
        }
        return done(err);
      }
      expect(res.body).to.have.property('user_id');
      expect(res.body).to.have.property('email');
      expect(res.body).to.have.property('paid');
      expect(res.body).to.have.property('token');
      done();
    });
});

});

after(() => {
  server.close();
 });
"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const chai_1 = require("chai");
const supertest_1 = __importDefault(require("supertest"));
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
        (0, supertest_1.default)(server)
            .post('/api/signUp')
            .send(params1)
            .expect('Content-Type', /json/)
            .expect(expectedStatusCode)
            .end((err, res) => {
            if (err) {
                if (res.status !== expectedStatusCode) {
                    console.log('|///////////////////////////');
                    console.log(`****** ${testName} ******`);
                    console.error(res.status, res.body.message);
                    console.log('\\\\\\\\\\\\\\\\\\\\\\\\\\\\|');
                }
                return done(err);
            }
            (0, chai_1.expect)(res.body).to.have.property('user_id');
            (0, chai_1.expect)(res.body).to.have.property('email');
            (0, chai_1.expect)(res.body).to.have.property('paid');
            (0, chai_1.expect)(res.body).to.have.property('token');
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
        (0, supertest_1.default)(server)
            .post('/api/signUp')
            .send(params2)
            .expect('Content-Type', /json/)
            .expect(expectedStatusCode2)
            .end((err, res) => {
            if (err) {
                if (res.status !== expectedStatusCode2) {
                    console.log('|///////////////////////////');
                    console.log(`****** ${testName} ******`);
                    console.error(res.status, res.body.message);
                    console.log('\\\\\\\\\\\\\\\\\\\\\\\\\\\\|');
                }
                return done(err);
            }
            (0, chai_1.expect)(res.body).to.have.property('user_id');
            (0, chai_1.expect)(res.body).to.have.property('email');
            (0, chai_1.expect)(res.body).to.have.property('paid');
            (0, chai_1.expect)(res.body).to.have.property('token');
            done();
        });
    });
});
after(() => {
    server.close();
});

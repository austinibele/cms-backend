"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const chai_1 = require("chai");
const supertest_1 = __importDefault(require("supertest"));
const server = require('../../server');
describe('POST /api/login', () => {
    const params = {
        phoneNumber: '',
        email: 'test@test.com',
        password: 'test'
    };
    const expectedStatusCode = 200;
    it('should login a user and return a token', (done) => {
        (0, supertest_1.default)(server)
            .post('/api/login')
            .send(params)
            .expect('Content-Type', /json/)
            .expect(expectedStatusCode)
            .end((err, res) => {
            (0, chai_1.expect)(res.body).to.have.property('user_id');
            (0, chai_1.expect)(res.body).to.have.property('email');
            (0, chai_1.expect)(res.body).to.have.property('paid');
            (0, chai_1.expect)(res.body).to.have.property('isAdmin');
            (0, chai_1.expect)(res.body).to.have.property('token');
            done();
        });
    });
    // Add more tests for failure scenarios, such as incorrect username/password
});
after(() => {
    server.close();
});

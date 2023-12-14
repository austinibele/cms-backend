"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const chai_1 = require("chai");
const supertest_1 = __importDefault(require("supertest"));
const server = require("../../server");
const testName = 'GET /api/contentPaths/:contentOption';
describe(testName, () => {
    const contentOption = 'blog';
    const invalidContentOption = 'invalidOption';
    const expectedStatusCode = 200;
    it('Should fetch available segments for a valid content option', (done) => {
        (0, supertest_1.default)(server)
            .get(`/api/contentPaths/${contentOption}`)
            .expect('Content-Type', /json/)
            .expect(expectedStatusCode)
            .end((err, res) => {
            if (err) {
                if (res.status !== expectedStatusCode) {
                    console.error(res.status, res.body.message);
                }
                return done(err);
            }
            (0, chai_1.expect)(res.body).to.be.an('array').that.includes('fixture');
            done();
        });
    });
    const expectedStatusCode2 = 404;
    it('Should return 404 for an invalid content option', (done) => {
        (0, supertest_1.default)(server)
            .get(`/api/contentPaths/${invalidContentOption}`)
            .expect(expectedStatusCode)
            .end((err, res) => {
            if (err) {
                if (res.status !== expectedStatusCode2) {
                    console.error(res.status, res.body.message);
                }
                return done();
            }
            (0, chai_1.expect)(res.text).to.equal('Content option not found');
            done();
        });
    });
});
after(() => {
    server.close();
});

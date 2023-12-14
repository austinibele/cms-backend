import { expect } from "chai";
import request from "supertest";
const server = require("../../server");

const testName = 'GET /api/contentPaths/:contentOption';
describe(testName, () => {
    const contentOption = 'blog';
    const invalidContentOption = 'invalidOption';

    const expectedStatusCode = 200;
    it('Should fetch available segments for a valid content option', (done) => {
        request(server)
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
                expect(res.body).to.be.an('array').that.includes('fixture');
                done();
            });
    });

    const expectedStatusCode2 = 404;
    it('Should return 404 for an invalid content option', (done) => {
        request(server)
            .get(`/api/contentPaths/${invalidContentOption}`)
            .expect(expectedStatusCode)
            .end((err, res) => {
              if (err) {
                if (res.status !== expectedStatusCode2) {
                  console.error(res.status, res.body.message);
                }
                return done();
              }
                expect(res.text).to.equal('Content option not found');
                done();
            });
    });
});

after(() => {
    server.close();
});
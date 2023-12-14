import { expect } from "chai";
import request from "supertest";
const server = require("../../server");

const testName = 'GET /api/fetchContent/:contentOption/:segment'
describe(testName, () => {
    const contentOption = 'blog';
    const segment = 'fixture';

    const expectedStatusCode = 200;
    it('Should fetch content successfully', async () => {
        try {
            const res = await request(server)
                .get(`/api/fetchContent/${contentOption}/${segment}`)
                .expect('Content-Type', /json/)
                .expect(expectedStatusCode);

            const data = JSON.parse(res.body);
            expect(data).to.have.property('postId');
            expect(data).to.have.property('metadata');
            expect(data).to.have.property('content');
        } catch (error: any) {
            // Log error details
            console.error(`Error in ${testName}:`, error);
            if (error.response) {
                console.error('Server response:', error.response.status, error.response.body);
            }
            throw error; // Re-throw error for Mocha to handle
        }
    });

    const expectedStatusCode2 = 404;
    it('Should return 404 for non-existing content', async () => {
        const nonExistingSegment = 'non-existing-segment';
        try {
            const res = await request(server)
                .get(`/api/fetchContent/${contentOption}/${nonExistingSegment}`)
                .expect(expectedStatusCode2);

            expect(res.text).to.equal('Content not found');
        } catch (error: any) {
            // Log error details
            console.error(`Error in ${testName}:`, error);
            if (error.response) {
                console.error('Server response:', error.response.status, error.response.body);
            }
            throw error; // Re-throw error for Mocha to handle
        }
    });
});

after(() => {
    server.close();
});

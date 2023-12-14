import { expect } from "chai";
import request from "supertest";
const server = require("../../server");
const fs = require('fs/promises');

const testName = 'POST /api/saveData';
describe(testName, () => {

  const params = {
    contentOption: "news",
    segment: "test",
    data: {
      title: 'Test Title',
      content: 'Test Content'
    }
  };

  const expectedPath = `../database/content/${params.contentOption}/${params.segment}.json`;
  const expectedStatusCode = 200;

  it('Should save data to a file', async () => { // Changed to async function
    try {
      const res = await request(server)
        .post('/api/saveData')
        .send(params)
        .expect('Content-Type', /json/)
        .expect(expectedStatusCode);

      // Assertions
      expect(res.body).to.have.property('message', 'Data saved successfully.');

      const data = await fs.readFile(expectedPath, 'utf8');
      expect(JSON.parse(data)).to.deep.equal(params.data);

    } catch (error: any) {
      // Log additional information here
      console.error(`Error in ${testName}:`, error);
      if (error.response) {
        console.error('Server response:', error.response.status, error.response.body);
      }
      throw error; // Rethrow the error for Mocha to handle
    }
  });

  after(async () => {
    await fs.unlink(expectedPath);
  });

});

after(() => {
  server.close();
});

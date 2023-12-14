import { expect } from "chai";
import request from "supertest";
const server = require("../../server");
const fs = require('fs');

// Helper function to check if a file exists
function checkFileExists(filepath: any) {
  return fs.existsSync(filepath);
}

describe('POST /api/saveData', () => {
 ////////////////////////////////////////
 ////////////////////////////////////////
  let originalConsoleError: any;
  
  beforeEach(() => {
    // Store the original console.error
    originalConsoleError = console.error;
  });

  afterEach(() => {
    // Restore the original console.error
    console.error = originalConsoleError;
  });
 ////////////////////////////////////////
 ////////////////////////////////////////


  const testFilename = 'blog/testfile.txt';
  const testFilePath = `../database/content/${testFilename}`;

  before(() => {
    // Ensure the test file exists before running the tests
    fs.writeFileSync(testFilePath, 'test data');
  });

  const expectedStatusCode = 200;
  it('Should delete the specified file', async () => {
    try {
      const res = await request(server)
        .post('/api/deleteData')
        .send({ deletePath: testFilename })
        .expect('Content-Type', /json/)
        .expect(expectedStatusCode);
      expect(res.body).to.have.property('message', 'Data deleted successfully.');
      expect(checkFileExists(testFilePath)).to.be.false;
    } catch (error) {
      console.error('Error in test:', error);
      throw error; // Re-throw the error
    }
  });


  it('Should return an error if the file does not exist', async () => {
    console.error = function() {};
    try {
      const res = await request(server)
        .post('/api/deleteData')
        .send({ deletePath: 'nonexistentfile.txt' })
        .expect(404);

      expect(res.body).to.have.property('message', 'File not found');
    } catch (error) {
      console.error('Error in test:', error);
      throw error; // Re-throw the error
    }
  });

  after(() => {
    // Cleanup: Delete the test file if it still exists
    if (checkFileExists(testFilePath)) {
      fs.unlinkSync(testFilePath);
    }
    server.close();
  });
});

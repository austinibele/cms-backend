import { expect } from 'chai';
import request from 'supertest';

const server = require("../../server");

describe('GET /api/database/uploads/:imageName', () => {
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

  it('should retrieve an uploaded image', async () => {
    const testImageName = "test.png"
    
    const res = await request(server)
      .get(`/api/database/uploads/${testImageName}`)
      .expect('Content-Type', /^image/)
      .expect(200);

    // Since we are sending a file, we check if the body is not empty
    expect(res.body).to.not.be.empty;
  });

  it('should return a 404 error for non-existent images', async () => {
    console.error = function() {};
    try {
        const res = await request(server)
        .get('/api/database/uploads/nonexistent.png')
        .expect(404);

        expect(res.text).to.equal('Not Found');
    } catch (error) {
        console.error('Error in test:', error);
        throw error; // Re-throw the error
    }
  });

  after(() => {
    server.close();
  });
});
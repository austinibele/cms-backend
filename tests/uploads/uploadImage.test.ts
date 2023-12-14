import { expect } from 'chai';
import request from 'supertest';
import fs from 'fs';
import path from 'path';

const server = require("../../server");

describe('POST /api/uploadImage', () => {
  const testImagePath = path.join(process.cwd(), 'tests/uploads/test.png');

  it('should upload an image and return the URL', async () => {
    const res = await request(server)
      .post('/api/uploadImage')
      .attach('image', fs.readFileSync(testImagePath), 'test.png')
      .expect('Content-Type', /json/)
      .expect(200);

    expect(res.body).to.have.property('success');
    expect(res.body.success).to.equal(1);
    expect(res.body.file).to.have.property('url');
  });


  after(() => {
    server.close();
  });
});
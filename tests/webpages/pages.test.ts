import { expect } from 'chai';
import request from 'supertest';

const server = require("../../server");

describe('GET /api/pages', () => {
  // Assuming we have a known locale and slug that should return a valid page
  const locale = 'en';
  const slug = 'home';

  it('should retrieve a page JSON based on slug and locale', async () => {
    const res = await request(server)
      .get('/api/pages')
      .query({ locale: locale, filters: { slug: slug } })
      .expect('Content-Type', /json/)
      .expect(200);

    expect(res.body).to.be.an('object');
    expect(res.body).to.have.property('data');
    expect(res.body).to.have.property('meta');
    expect(res.body.data).to.be.an('array');
  });

  it('should return an error if slug or locale is missing', async () => {
    const res = await request(server)
      .get('/api/pages')
      .query({}) // No query parameters provided
      .expect(400);

    expect(res.text).to.equal('Slug and locale are required.');
  });

  after(() => {
    server.close();
  });
});
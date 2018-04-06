import  chai  from 'chai';
import  request from 'supertest';

const expect = chai.expect;
const initApp = require('./../bin/www');
const app = initApp.app;
const server = initApp.server;

let should = chai.should();

after(() => {
  server.close();
});

describe('Basic routing tests', () => {
  it('Root route', async () => {
    await request(app).get('/').expect(403);
  });

  it('Status route', async () => {
    await request(app).get('/status').expect(200);
  });
});
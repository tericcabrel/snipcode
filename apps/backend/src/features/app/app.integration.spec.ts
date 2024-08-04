import request from 'supertest';

import { TestServer, startTestServer } from '../../utils/tests/server';

describe('Application Common Endpoints', () => {
  let server: TestServer;

  beforeAll(async () => {
    server = await startTestServer();
  });

  afterAll(async () => {
    await server.close();
  });

  test('The entry endpoint returns a Hello world message', async () => {
    const response = await request(server.app.getHttpServer()).get('/').expect(200);

    expect(response.body).toEqual({});
    expect(response.text).toBeDefined();
  });
});

import { expect, describe, beforeAll, it, test, jest } from '@jest/globals';
import request from 'supertest';
import express from 'express';
import loaders from '../../src/loaders/index';

const app = express();

jest.setTimeout(15000);

beforeAll(async () => {
  await loaders({ expressApp: app });
});

describe('Check all general routes', () => {
  it('should return 404', async () => {
    await request(app).get('/not-found').set('Accept', 'application/json').expect('Content-Type', /json/).expect(404);
  });
});

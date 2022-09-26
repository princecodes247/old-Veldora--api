const { expect, describe, beforeAll, it, test, jest } = require('@jest/globals');
const request = require('supertest');
const express = require('express');
const loaders = require('../../src/loaders');
const { api } = require('../../src/config');

const app = express();

jest.setTimeout(15000);

beforeAll(async () => {
  await loaders({ expressApp: app });
});
const path = `${api.prefix}/auth`;

describe('Sign up auth routes', () => {
  it('Sign up', async () => {
    await request(app)
      .post(`${path}/signup`)
      .send({ name: 'john' })
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect(500);
  });
});

describe('Sign in auth routes', () => {
  it('Should sign in successfully', async () => {
    await request(app)
      .post(`${path}/signin`)
      .send({ email: 'prince@gmail.com', password: 'prince' })
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect(200);
  });

  it('Should Return invalid password', async () => {
    await request(app)
      .post(`${path}/signin`)
      .send({ email: 'prince@gmail.com', password: 'invalid' })
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect(500);
  });
});

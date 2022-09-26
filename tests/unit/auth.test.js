const { expect, describe, beforeAll, afterAll, it, test } = require('@jest/globals');
const mongoose = require('mongoose');
const mongooseLoader = require('../../src/loaders/mongoose');
const AuthService = require('../../src/services/auth.service');
const UserModel = require('../../src/models/user.model');
const mockData = require('../mock_data');
const Logger = require('../../src/loaders/logger');

let db;

beforeAll(async () => {
  // db = await mongooseLoader('mongodb://localhost/veldora-api-test');
  await mongoose.connect('mongodb://localhost/veldora-api-test');

  try {
    await UserModel.collection.drop();
  } catch (error) {
    console.log('User collection not found');
  }
  console.log('👌 DB loaded and connected!');
});

describe('Sign up auth service', () => {
  it('Sign up', async () => {
    const data = await AuthService.signUp(mockData.user);
    expect(data.user).toHaveProperty('email', mockData.user.email);
    expect(data.user).toHaveProperty('name', mockData.user.name);
    expect(data.user).toHaveProperty('role', mockData.user.role);
  });
});

describe('Sign in auth routes', () => {
  it('Should sign in successfully', async () => {
    const data = await AuthService.signIn(mockData.user.email, mockData.user.password);

    expect(data.user).toHaveProperty('email', mockData.user.email);
    expect(data.user).toHaveProperty('name', mockData.user.name);
    expect(data.user).toHaveProperty('role', mockData.user.role);
  });

  it('Should Return invalid password', async () => {
    try {
      const data = await AuthService.signIn(mockData.user.email, 'invalid');
      console.log(data);
    } catch (error) {
      expect(error.message).toBe('Invalid Password');
    }
  });
});

afterAll(async () => {
  await UserModel.collection.drop();
  // await db.close();
  await mongoose.connection.close();
  console.log('👌 DB disconnected');
});

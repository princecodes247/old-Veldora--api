const { expect, describe, beforeAll, afterAll, it, beforeEach, afterEach } = require('@jest/globals');
const mongoose = require('mongoose');
const mongooseLoader = require('../../src/loaders/mongoose');
const UserService = require('../../src/services/user.service');
const UserModel = require('../../src/models/user.model');
const mockData = require('../mock_data');
const Logger = require('../../src/loaders/logger');

beforeAll(async () => {
  await mongoose.connect('mongodb://localhost/veldora-api-test');
  try {
    await UserModel.collection.drop();
  } catch (error) {
    console.log('User collection not found');
  }
  console.log('👌 DB loaded and connected!');
});

describe('Test Get all users method', () => {
  // Create 21 dummy users
  beforeEach(async () => {
    try {
      await UserModel.collection.drop();
    } catch (error) {
      console.log('User collection not found');
    }
    await UserModel.insertMany(mockData.users());
  });
  afterEach(async () => {
    try {
      await UserModel.collection.drop();
    } catch (error) {
      console.log('User collection not found');
    }
  });
  it('Should get first ten users', async () => {
    const result = await UserService.getAll();
    expect(result.data.length).toBe(10);
    expect(result.data[0].name).toBe('test0');
    expect(result.page).toBe(1);
    expect(result.next).toBe(2);
    expect(result.limit).toBe(10);
  });
  it('Should get second set of ten users', async () => {
    const result = await UserService.getAll(2);
    // console.log(result);
    expect(result.data.length).toBe(10);
    expect(result.data[0].name).toBe('test10');
    expect(result.page).toBe(2);
    expect(result.next).toBe(3);
    expect(result.limit).toBe(10);
  });
  it('Should get the last user', async () => {
    const result = await UserService.getAll(3);
    // console.log(result);
    expect(result.data.length).toBe(1);
    expect(result.data[0].name).toBe('test20');
    expect(result.page).toBe(3);
    expect(result.next).toBe(null);
    expect(result.limit).toBe(10);
  });
});

describe('Test Get one user method', () => {
  it('Should return a single user details', async () => {});
  it('Should throw an error', async () => {});
});

afterAll(async () => {
  try {
    await UserModel.collection.drop();
  } catch (error) {
    console.log('User collection not found');
  }
  // await db.close();
  await mongoose.connection.close();
  console.log('👌 DB disconnected');
});

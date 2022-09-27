const { expect, describe, beforeAll, afterAll, it, beforeEach, afterEach } = require('@jest/globals');
const mongoose = require('mongoose');
const UserService = require('../../src/services/user.service');
const TestModel = require('../../src/models/test.model');
const mockData = require('../mock_data');

beforeAll(async () => {
  await mongoose.connect('mongodb://localhost/nick-test');
});

describe('Test test model', () => {
  beforeEach(async () => {
    try {
      await TestModel.collection.drop();
    } catch (error) {
      console.log('User collection not found');
    }
  });
  afterEach(async () => {
    try {
      await TestModel.collection.drop();
    } catch (error) {
      console.log('User collection not found');
    }
  });
  it('Should return ', async () => {
    await TestModel.insertMany([
      {
        name: '1',
        points: [6, 7, 5],
      },
      {
        name: '2',
        points: [9, 6, 8],
      },
      {
        name: '3',
        points: [5, 5, 8],
      },
      {
        name: '4',
        points: [7, 8],
      },
      {
        name: '5',
        points: [2],
      },
    ]);

    const result = await TestModel.find({ points: { $gte: [6, 7, 5] } });
    console.log(result);
  });
});

afterAll(async () => {
  try {
    await TestModel.collection.drop();
  } catch (error) {
    console.log('User collection not found');
  }
  // await db.close();
  await mongoose.connection.close();
  console.log('👌 DB disconnected');
});

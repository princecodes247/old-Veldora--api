const { Container } = require('typedi');
const CRUD = require('./factories/crud.factory');

const FormModel = require('../models/form');

class FormService extends CRUD {
  async create(data) {
    const result = new FormModel(data);
    await result.save().catch(err => {
      console.log('ji');
      // logger.error('🔥 error: %o', e);
      console.log('jiaaaa');
      throw new Error(err);
    });
    console.log(result);
    return {
      result,
      error: false,
    };
  }

  async getAll(limit, page) {
    const _limit = Number(limit) || 10;
    const _skip = Number((page - 1) * limit) || 0;

    const result = await Promise.all([
      this.model.find({}).skip(_skip).limit(_limit).populate('submissions'),
      this.model.countDocuments(),
    ]);

    if (Number(page) * limit < result[1]) {
      return {
        page,
        next: page + 1,
        limit: _limit,
        users: result[0],
        total: result[1],
      };
    }
    return {
      page,
      next: null,
      limit: _limit,
      users: result[0],
      total: result[1],
    };
  }

  async test() {
    const eventDispatcher = Container.get('eventDispatcher');
    eventDispatcher.dispatch('users');
    return 'test';
  }
}

module.exports = new FormService(FormModel, 'Form');

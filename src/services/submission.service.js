const { Container } = require('typedi');
const Submission = require('../models/submission');
const CRUD = require('./factories/crud.factory');

class SubmissionService extends CRUD {
  async getAll(limit, page) {
    const _limit = Number(limit) || 10;
    const _skip = Number((page - 1) * limit) || 0;

    const result = await Promise.all([this.model.find({}).skip(_skip).limit(_limit), this.model.countDocuments()]);

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

module.exports = new SubmissionService(Submission, 'Submission');

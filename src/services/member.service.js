const { Container } = require('typedi');
const CRUD = require('./factories/crud.factory');

const MemberModel = require('../models/member');

module.exports = class MemberService extends CRUD {
  constructor() {
    super();
    this.model = MemberModel;
    // this.eventDispatcher = new EventDispatcher();
  }

  async getAll(limit, page) {
    const _limit = Number(limit) || 10;
    const _skip = Number((page - 1) * limit) || 0;

    const result = await Promise.all([
      this.model.find({}).skip(_skip).limit(_limit).populate('forms'),
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
};

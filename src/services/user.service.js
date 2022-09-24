const CRUD = require('./factories/crud.factory');
const { eventDispatcher } = require('../loaders/events');
const UserModel = require('../models/user');

class UserService extends CRUD {
  constructor() {
    super();
    this.model = UserModel;
    // this.eventDispatcher = new EventDispatcher();
  }

  async getAll(limit, page) {
    const _limit = Number(limit) || 10;
    const _skip = Number((page - 1) * limit) || 0;

    const result = await Promise.all([
      this.model.find({}, { password: 0, salt: 0, __v: 0 }).skip(_skip).limit(_limit),
      // .populate('workspaces'),
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
    eventDispatcher.dispatch('users');
    return 'tests';
  }
}

module.exports = new UserService();

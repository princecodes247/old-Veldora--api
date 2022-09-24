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
    return this._paginatedQuery({ limit, page }, {}, { password: 0, salt: 0, __v: 0 });
  }

  async test() {
    eventDispatcher.dispatch('users');
    return 'tests';
  }
}

module.exports = new UserService();

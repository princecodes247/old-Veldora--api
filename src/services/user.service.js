const CRUD = require('./factories/crud.factory');
const eventDispatcher = require('../loaders/events');
const UserModel = require('../models/user.model');

class UserService extends CRUD {
  async getAll(page, limit) {
    return this._paginatedQuery({ limit, page }, {}, { password: 0, salt: 0, __v: 0 });
  }
  async updateQuota(id, value) {
    const user = await this.Model.findById(id);
    user.quota = user.quota + value;
    await user.save();
    return user;
  }
}

module.exports = new UserService(UserModel, 'User');

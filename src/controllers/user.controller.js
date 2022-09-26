const logger = require('../loaders/logger');
const UserService = require('../services/user.service');

class UserController {
  async getAllUsers(req, res, next) {
    try {
      const users = await UserService.getAll(req.body.page, req.body.limit);
      return res.json({ users }).status(200);
    } catch (e) {
      logger.error('🔥 error: %o', e);
      return next(e);
    }
  }

  async getOne(req, res, next) {
    try {
      const users = await UserService.getOne(req.userId);
      return res.json({ users }).status(200);
    } catch (e) {
      logger.error('🔥 error: %o', e);
      return next(e);
    }
  }

  async test(req, res) {
    const test = await UserService.test();
    return res.json({ test }).status(200);
  }
}

module.exports = new UserController();

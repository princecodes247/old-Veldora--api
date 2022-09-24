const UserService = require('../services/user.service');

class UserController {
  async getAllUsers(req, res) {
    const users = await UserService.getAll();
    return res.json({ users }).status(200);
  }

  async getOne(req, res) {
    const users = await UserService.getOne(req.userId);
    return res.json({ users }).status(200);
  }

  async test(req, res) {
    const test = await UserService.test();
    return res.json({ test }).status(200);
  }
}

module.exports = new UserController();

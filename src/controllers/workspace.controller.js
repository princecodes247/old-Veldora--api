const WorkspaceService = require('../services/workspace.service');

class WorkspaceController {
  async getAll(req, res) {
    const users = await WorkspaceService.getAll();
    return res.json({ users }).status(200);
  }

  async getOne(req, res) {
    const users = await WorkspaceService.getOne(req.userId);
    return res.json({ users }).status(200);
  }

  async create(req, res) {
    const test = await WorkspaceService.create(req.body);
    return res.json({ test }).status(200);
  }
}

module.exports = new WorkspaceController();

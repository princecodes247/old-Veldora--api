const logger = require('../loaders/logger');
const WorkspaceService = require('../services/workspace.service');

class WorkspaceController {
  async getAll(req, res, next) {
    logger.debug('Calling Get all workspace endpoint with body: %o', req.body);
    try {
      const users = await WorkspaceService.getAll();
      return res.json({ users }).status(200);
    } catch (e) {
      logger.error('🔥 error: %o', e);
      return next(e);
    }
  }

  async getOne(req, res, next) {
    try {
      const users = await WorkspaceService.getOne(req.params.workspaceId);
      return res.json({ users }).status(200);
    } catch (e) {
      logger.error('🔥 error: %o', e);
      return next(e);
    }
  }

  async create(req, res, next) {
    try {
      const test = await WorkspaceService.create(req.body);
      return res.json({ test }).status(200);
    } catch (e) {
      logger.error('🔥 error: %o', e);
      return next(e);
    }
  }
}

module.exports = new WorkspaceController();

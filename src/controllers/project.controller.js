const logger = require('../loaders/logger');
const ProjectService = require('../services/project.service');

class ProjectController {
  async create(req, res, next) {
    try {
      const { workspaceId } = req.params;
      const project = await ProjectService.create({ ...req.body, workspace: workspaceId });
      return res.json({ project }).status(200);
    } catch (e) {
      logger.error('🔥 error: %o', e);
      return next(e);
    }
  }

  async getAll(req, res, next) {
    try {
      const users = await ProjectService.getAll();
      return res.json({ users }).status(200);
    } catch (e) {
      logger.error('🔥 error: %o', e);
      return next(e);
    }
  }

  async getOne(req, res, next) {
    try {
      const project = await ProjectService.getOne(req.params.projectId);
      return res.json(project).status(200);
    } catch (e) {
      logger.error('🔥 error: %o', e);
      return next(e);
    }
  }
}

module.exports = new ProjectController();

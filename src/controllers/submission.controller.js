const logger = require('../loaders/logger');
const SubmissionService = require('../services/submission.service');
const UserService = require('../services/user.service');

class SubmissionController {
  async create(req, res, next) {
    try {
      const { projectId } = req.params;
      const { owner } = await ProjectService.getOne(projectId);
      const submission = await SubmissionService.create({ ...req.body, project: projectId });
      await UserService.updateQuota(owner, -1);
      return res.json(submission).status(200);
    } catch (e) {
      logger.error('🔥 error: %o', e);
      return next(e);
    }
  }

  async getAll(req, res, next) {
    try {
      const users = await SubmissionService.getAll();
      return res.json({ users }).status(200);
    } catch (e) {
      logger.error('🔥 error: %o', e);
      return next(e);
    }
  }

  async getOne(req, res, next) {
    try {
      const project = await SubmissionService.getOne(req.params.projectId);
      return res.json({ project }).status(200);
    } catch (e) {
      logger.error('🔥 error: %o', e);
      return next(e);
    }
  }
}

module.exports = new SubmissionController();

const logger = require('../loaders/logger');
const SubmissionService = require('../services/submission.service');

class SubmissionController {
  async create(req, res, next) {
    try {
      const { projectId } = req.params;
      const submission = await SubmissionService.create({ ...req.body, project: projectId });
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

  async getProjectSubmissions(req, res) {
    const test = await SubmissionService.getProjectSubmissions();
    return res.json({ test }).status(200);
  }
}

module.exports = new SubmissionController();

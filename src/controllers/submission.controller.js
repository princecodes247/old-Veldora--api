const Logger = require('../loaders/logger');
const SubmissionService = require('../services/submission.service');

class SubmissionController {
  async create(req, res, next) {
    try {
      const { formId } = req.params;
      const submission = await SubmissionService.create({ ...req.body, form: formId });
      return res.json(submission).status(200);
    } catch (e) {
      // logger.error('🔥 error: %o', e);
      return next(e);
    }
  }

  async getAll(req, res) {
    const users = await SubmissionService.getAll();
    return res.json({ users }).status(200);
  }

  async getOne(req, res) {
    const form = await SubmissionService.getOne(req.params.formId);
    return res.json({ form }).status(200);
  }

  async test(req, res) {
    const test = await SubmissionService.test();
    return res.json({ test }).status(200);
  }
}

module.exports = new SubmissionController();

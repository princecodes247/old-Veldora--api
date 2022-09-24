const logger = require('../loaders/logger');
const FormService = require('../services/form.service');

class FormController {
  async create(req, res, next) {
    try {
      const { workspaceId } = req.params;
      const form = await FormService.create({ ...req.body, workspace: workspaceId });
      return res.json({ form }).status(200);
    } catch (e) {
      logger.error('🔥 error: %o', e);
      return next(e);
    }
  }

  async getAll(req, res, next) {
    try {
      const users = await FormService.getAll();
      return res.json({ users }).status(200);
    } catch (e) {
      logger.error('🔥 error: %o', e);
      return next(e);
    }
  }

  async getOne(req, res, next) {
    try {
      const form = await FormService.getOne(req.params.formId);
      return res.json({ form }).status(200);
    } catch (e) {
      logger.error('🔥 error: %o', e);
      return next(e);
    }
  }

  async test(req, res) {
    const test = await FormService.test();
    return res.json({ test }).status(200);
  }
}

module.exports = new FormController();

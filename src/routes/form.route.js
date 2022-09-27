const { Router } = require('express');
const { celebrate, Joi } = require('celebrate');
const config = require('../config');
const FormController = require('../controllers/form.controller');
const SubmissionController = require('../controllers/submission.controller');
const { attachCurrentUser, isAuth } = require('../middlewares');

const route = Router();

module.exports = app => {
  app.use(`${config.api.prefix}/forms`, route);

  // Forms Routes
  route.post('/', FormController.create);
  route.get('/', FormController.getAll);
  route.get('/:formId', FormController.getOne);
  route.get('/:formId/submissions', SubmissionController.getFormSubmissions);
  // route.get('/:workspaceId/forms/:formId/analytics', WorkspaceController.getAnalytics);
  // route.get('/:workspaceId/forms/:formId/exports', WorkspaceController.export);
  // route.get('/:workspaceId/forms/:formId/settings', WorkspaceController.settings);
  // route.get('/:workspaceId/forms/:formId', WorkspaceController.getOne);

  // route.get('/:workspaceId/forms/:formId', WorkspaceController.getOne);
};

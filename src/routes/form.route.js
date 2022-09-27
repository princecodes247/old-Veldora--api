const { Router } = require('express');
const { celebrate, Joi } = require('celebrate');
const config = require('../config');
const FormController = require('../controllers/form.controller');
const SubmissionController = require('../controllers/submission.controller');
const { isCurrentUser, isAuth, isWorkspaceMember } = require('../middlewares');
const { role } = require('../config');

const route = Router();

module.exports = app => {
  app.use(`${config.api.prefix}/forms`, route);

  // Forms Routes
  route.post('/', isAuth(role.USER), isWorkspaceMember, FormController.create);
  route.get('/', isAuth(role.ADMIN), isWorkspaceMember, FormController.getAll);
  route.get('/:formId', isAuth(role.USER), isWorkspaceMember, FormController.getOne);
  route.get('/:formId/submissions', isAuth(role.USER), isWorkspaceMember, SubmissionController.getFormSubmissions);
  // route.get('/:workspaceId/forms/:formId/analytics', WorkspaceController.getAnalytics);
  // route.get('/:workspaceId/forms/:formId/exports', WorkspaceController.export);
  // route.get('/:workspaceId/forms/:formId/settings', WorkspaceController.settings);
  // route.get('/:workspaceId/forms/:formId', WorkspaceController.getOne);

  // route.get('/:workspaceId/forms/:formId', WorkspaceController.getOne);
};

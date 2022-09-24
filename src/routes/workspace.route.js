const { Router } = require('express');
const { celebrate, Joi } = require('celebrate');
const config = require('../config');
const WorkspaceController = require('../controllers/workspace.controller');
const FormController = require('../controllers/form.controller');
// const SuController = require('../controllers/user.controller');
const { attachCurrentUser, isAuth } = require('../middlewares');
const SubmissionController = require('../controllers/submission.controller');

const route = Router();

module.exports = app => {
  app.use(`${config.api.prefix}/workspaces`, route);

  route.post(
    '/',
    celebrate({
      body: Joi.object({
        name: Joi.string().required(),
        description: Joi.string(),
        owner: Joi.string().required(),
        quota: Joi.any().forbidden(),
      }),
    }),
    WorkspaceController.create
  );
  route.get(
    '/',
    // isAuth,
    WorkspaceController.getAll
  );
  // route.get('/test', WorkspaceController.test);

  route.get('/:workspaceId', WorkspaceController.getOne);
  route.get('/:workspaceId/settings', WorkspaceController.getOne);
  route.get('/:workspaceId/members', WorkspaceController.getOne);

  // Forms Routes
  route.post('/:workspaceId/forms', FormController.create);
  route.get('/:workspaceId/forms', FormController.getAll);
  route.get('/:workspaceId/forms/:formId', FormController.getOne);
  route.get('/:workspaceId/forms/:formId/submissions', SubmissionController.getFormSubmissions);
  // route.get('/:workspaceId/forms/:formId/analytics', WorkspaceController.getAnalytics);
  // route.get('/:workspaceId/forms/:formId/exports', WorkspaceController.export);
  // route.get('/:workspaceId/forms/:formId/settings', WorkspaceController.settings);
  // route.get('/:workspaceId/forms/:formId', WorkspaceController.getOne);

  // route.get('/:workspaceId/forms/:formId', WorkspaceController.getOne);
};

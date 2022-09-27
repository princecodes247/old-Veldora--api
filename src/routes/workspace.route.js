const { Router } = require('express');
const { celebrate, Joi } = require('celebrate');
const config = require('../config');
const WorkspaceController = require('../controllers/workspace.controller');
const FormController = require('../controllers/form.controller');
// const SuController = require('../controllers/user.controller');
const { attachCurrentUser, isAuth } = require('../middlewares');
const SubmissionController = require('../controllers/submission.controller');
const { role } = require('../config');

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
  route.get('/', isAuth(role.ADMIN), WorkspaceController.getAll);
  // route.get('/test', WorkspaceController.test);

  route.get('/:workspaceId', WorkspaceController.getOne);
  route.get('/:workspaceId/settings', WorkspaceController.getOne);
  route.get('/:workspaceId/members', WorkspaceController.getOne);
};

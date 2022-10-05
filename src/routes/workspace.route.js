const { Router } = require('express');
const { celebrate, Joi } = require('celebrate');
const config = require('../config');
const WorkspaceController = require('../controllers/workspace.controller');
const FormController = require('../controllers/project.controller');
// const SuController = require('../controllers/user.controller');
const { isCurrentUser, isWorkspaceMember, isAuth } = require('../middlewares');
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
    isAuth(role.USER),
    WorkspaceController.create
  );
  route.get('/', isAuth(role.ADMIN), WorkspaceController.getAll);
  // route.get('/test', WorkspaceController.test);

  route.get('/:workspaceId', isAuth(role.USER), isWorkspaceMember, WorkspaceController.getOne);
  route.get('/:workspaceId/settings', isAuth(role.USER), isWorkspaceMember, WorkspaceController.getOne);
  route.get('/:workspaceId/members', isAuth(role.USER), isWorkspaceMember, WorkspaceController.getOne);
};

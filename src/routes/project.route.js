const { Router } = require('express');
const { celebrate, Joi } = require('celebrate');
const config = require('../config');
const ProjectController = require('../controllers/project.controller');
const SubmissionController = require('../controllers/submission.controller');
const { isCurrentUser, isAuth, isWorkspaceMember } = require('../middlewares');
const { role } = require('../config');

const route = Router();

module.exports = app => {
  app.use(`${config.api.prefix}/projects`, route);

  // Projects Routes
  route.post('/', isAuth(role.USER), isWorkspaceMember, ProjectController.create);
  route.get('/', isAuth(role.ADMIN), isWorkspaceMember, ProjectController.getAll);
  route.get('/:projectId', isAuth(role.USER), isWorkspaceMember, ProjectController.getOne);
  route.get(
    '/:projectId/submissions',
    isAuth(role.USER),
    isWorkspaceMember,
    SubmissionController.getProjectSubmissions
  );
  // route.get('/:workspaceId/projects/:projectId/analytics', WorkspaceController.getAnalytics);
  // route.get('/:workspaceId/projects/:projectId/exports', WorkspaceController.export);
  // route.get('/:workspaceId/projects/:projectId/settings', WorkspaceController.settings);
  // route.get('/:workspaceId/projects/:projectId', WorkspaceController.getOne);

  // route.get('/:workspaceId/projects/:projectId', WorkspaceController.getOne);
};

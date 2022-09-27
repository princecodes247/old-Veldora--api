const { Router } = require('express');
const { role } = require('../config');
const config = require('../config');
const MemberController = require('../controllers/member.controller');

const UserController = require('../controllers/user.controller');
const { isAuth } = require('../middlewares');

const route = Router();

module.exports = app => {
  app.use(`${config.api.prefix}/users`, route);

  route.get('/', isAuth(role.USER), UserController.getAllUsers);
  route.get('/me', isAuth(role.USER), UserController.getUserDetails);
  route.get('/:userId', UserController.getOne);
  route.get('/:userId/workspaces', MemberController.getUserMemberships);
};

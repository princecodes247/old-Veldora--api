const { Router } = require('express');
const { role } = require('../config');
const config = require('../config');
const MemberController = require('../controllers/member.controller');

const UserController = require('../controllers/user.controller');
const { isCurrentUser, isAuth } = require('../middlewares');

const route = Router();

module.exports = app => {
  app.use(`${config.api.prefix}/users`, route);

  route.get('/', isAuth(role.ADMIN), UserController.getAllUsers);
  route.get('/me', isAuth(role.USER), UserController.getUserDetails);
  route.get('/:userId', isAuth(role.ADMIN), UserController.getOne);
  route.get('/:userId/workspaces', isAuth(role.USER), isCurrentUser, MemberController.getUserMemberships);
};

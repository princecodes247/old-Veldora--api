const { Router } = require('express');
const { role } = require('../config');
const config = require('../config');

const UserController = require('../controllers/user.controller');
const { attachCurrentUser, isAuth } = require('../middlewares');

const route = Router();

module.exports = app => {
  app.use(`${config.api.prefix}/users`, route);

  // route.get('/', isAuth(), attachCurrentUser, (req, res) => res.json({ user: req.currentUser }).status(200));

  route.get('/', isAuth(role.USER), UserController.getAllUsers);
  route.get('/me', isAuth, UserController.getUserDetails);
  route.get('/:userId', UserController.getOne);
};

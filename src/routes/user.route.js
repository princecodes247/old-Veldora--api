const { Router } = require('express');
const config = require('../config');

const UserController = require('../controllers/user.controller');
const { attachCurrentUser, isAuth } = require('../middlewares');

const route = Router();

module.exports = app => {
  app.use(`${config.api.prefix}/users`, route);

  route.get('/me', isAuth, attachCurrentUser, (req, res) => res.json({ user: req.currentUser }).status(200));

  route.get('/', isAuth, UserController.getAllUsers);
  route.get('/get-one', UserController.getOne);
  route.get('/test', UserController.test);
};

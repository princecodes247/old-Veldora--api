const express = require('express');
const { Container } = require('typedi');
const { celebrate, Joi } = require('celebrate');
const LoggerInstance = require('../loaders/logger');
const AuthController = require('../controllers/auth.controller');
const middlewares = require('../middlewares');
const config = require('../config');

const { Router } = express;

const route = Router();

module.exports = app => {
  app.use(`${config.api.prefix}/auth`, route);

  route.post(
    '/signup',
    celebrate({
      body: Joi.object({
        name: Joi.string().required(),
        email: Joi.string().required().email(),
        password: Joi.string().required(),
        // repeat_password: Joi.ref('password').error(new Error('Passwords do not match')),
      }),
    }),
    AuthController.signUp
  );

  route.post(
    '/signin',
    celebrate({
      body: Joi.object({
        email: Joi.string().required().email(),
        password: Joi.string().required(),
      }),
    }),
    AuthController.signIn
  );

  /**
   * @TODO Let's leave this as a place holder for now
   * The reason for a logout route could be deleting a 'push notification token'
   * so the device stops receiving push notifications after logout.
   *
   * Another use case for advance/enterprise apps, you can store a record of the jwt token
   * emitted for the session and add it to a black list.
   * It's really annoying to develop that but if you had to, please use Redis as your data store
   */
  route.post('/logout', middlewares.isAuth, (req, res, next) => {
    LoggerInstance.silly('test logout');
    const logger = Container.get('logger');
    logger.debug('Calling Sign-Out endpoint with body: %o', req.body);
    try {
      // @TODO AuthService.Logout(req.user) do some clever stuff
      return res.status(200).end();
    } catch (e) {
      logger.error('🔥 error %o', e);
      return next(e);
    }
  });
};

const { Router } = require('express');
const { celebrate, Joi } = require('celebrate');
const SubmissionController = require('../controllers/submission.controller');
const { attachCurrentUser, isAuth } = require('../middlewares');

const route = Router();

module.exports = app => {
  app.use('/s', route);

  route.post(
    '/:formId',
    celebrate({
      body: Joi.object({
        data: Joi.object(),
      }),
    }),
    SubmissionController.create
  );
};

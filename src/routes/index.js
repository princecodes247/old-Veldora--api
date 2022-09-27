const { Router } = require('express');
const auth = require('./auth.route');
const submission = require('./submission.route');
const user = require('./user.route');
const form = require('./form.route');
const workspace = require('./workspace.route');

// guaranteed to get dependencies
module.exports = () => {
  const app = Router();
  auth(app);
  user(app);
  workspace(app);
  form(app);
  submission(app);

  return app;
};

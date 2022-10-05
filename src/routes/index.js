const { Router } = require('express');
const auth = require('./auth.route');
const submission = require('./submission.route');
const user = require('./user.route');
const project = require('./project.route');
// const workspace = require('./workspace.route');

// guaranteed to get dependencies
module.exports = () => {
  const app = Router();
  auth(app);
  user(app);
  // workspace(app);
  project(app);
  submission(app);

  return app;
};

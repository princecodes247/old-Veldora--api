const isCurrentUser = require('./isCurrentUser');
const isAuth = require('./isAuth');
const isWorkspaceMember = require('./isWorkspaceMember');

// export { isCurrentUser, isAuth };

module.exports = {
  isAuth,
  isCurrentUser,
  isWorkspaceMember,
};

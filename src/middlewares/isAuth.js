const jwt = require('jsonwebtoken');
const User = require('../models/user.model');
const { ACCESS_TOKEN } = require('../constants/auth.constants');
const { role, jwtSecret } = require('../config');

/**
 * If no role is passed the default role is user
 *
 * @param  {any[]} roles List of roles allowed to access the route
 */
function isAuth(roles = []) {
  const rolesList = roles.length > 0 ? roles : role.USER;

  return async (req, res, next) => {
    try {
      const bearerHeader = req.headers.authorization;
      const signedCookie = req.signedCookies[ACCESS_TOKEN];

      if (!signedCookie && !bearerHeader) {
        throw new Error('Unauthorized access: Authorization token not passed');
      }
      let token = '';

      if (bearerHeader) {
        const bearer = bearerHeader.split(' ');
        [, token] = bearer;
      } else if (signedCookie) {
        token = signedCookie;
      } else {
        throw new Error('Unauthorized access: Authorization token not passed');
      }

      let decoded = null;
      try {
        decoded = jwt.verify(token, jwtSecret);
      } catch (error) {
        throw new Error('Unauthorized access: Invalid token');
      }

      const user = await User.findOne({ _id: decoded.uid }, { salt: 0, password: 0, __v: 0 });

      if (!user) {
        throw new Error('Unauthorized access: User not found');
      }
      if (user.suspended) {
        throw new Error('Unauthorized access: User has been deactivated');
      }
      // if (!user.verified) {
      //   throw new Error("Unauthorized access: User hasn't onboarded");
      // }

      if (user.role === role.ADMIN) {
        req.$user = user;
        return null;
      }

      if (!rolesList.includes(user.role)) {
        throw new Error('Unauthorized access');
      }
      req.$user = user;

      next();
      return null;
    } catch (error) {
      return next(error);
    }
  };
}

module.exports = isAuth;

const {
  ACCESS_TOKEN,
  BCRYPT_SALT,
  COOKIE_SECRET,
  JWT_SECRET,
  REFRESH_TOKEN,
  cookieOptions,
  refreshCookieOptions,
} = require('./auth.constants');

const { user } = require('./events.constants');

module.exports = {
  ACCESS_TOKEN,
  BCRYPT_SALT,
  COOKIE_SECRET,
  cookieOptions,
  JWT_SECRET,
  REFRESH_TOKEN,
  refreshCookieOptions,
  user,
};

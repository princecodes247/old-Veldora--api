const logger = require('../loaders/logger');
const AuthService = require('../services/auth.service');
const { ACCESS_TOKEN, cookieOptions, refreshCookieOptions, REFRESH_TOKEN } = require('../constants/auth.constants');

class AuthController {
  async signUp(req, res, next) {
    logger.debug('Calling Sign-Up endpoint with body: %o', req.body);
    try {
      const { user, token } = await AuthService.signUp(req.body);
      return res.status(201).json({ user, token });
    } catch (e) {
      logger.error('🔥 error: %o', e);
      return next(e);
    }
  }

  async signIn(req, res, next) {
    logger.debug('Calling Sign-In endpoint with body: %o', req.body);
    try {
      const { email, password } = req.body;
      const { user, tokens } = await AuthService.signIn(email, password);

      const { accessToken, refreshToken } = tokens;
      console.log({ accessToken });
      // res.cookie(REFRESH_TOKEN, refreshToken, refreshCookieOptions);
      // res.cookie(ACCESS_TOKEN, accessToken, cookieOptions);
      return res.json({ user, accessToken, refreshToken }).status(200);
    } catch (e) {
      logger.error('🔥 error: %o', e);
      return next(e);
    }
  }
}

module.exports = new AuthController();

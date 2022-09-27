const logger = require('../loaders/logger');
const MemberService = require('../services/member.service');

class UserController {
  async getUserMemberships(req, res, next) {
    try {
      const memberships = await MemberService.getUserMemberships(req.params.userId);
      return res.json({ data: memberships }).status(200);
    } catch (e) {
      logger.error('🔥 error: %o', e);
      return next(e);
    }
  }
}

module.exports = new UserController();

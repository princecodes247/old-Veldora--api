const CRUD = require('./factories/crud.factory');

const MemberModel = require('../models/member.model');

class MemberService extends CRUD {
  async getUserMemberships(userId) {
    return this.Model.find({ user: userId }, { user: 0 }).lean();
  }

  async validateInWorkspace(userId, workspaceId) {
    const member = await this.Model.findOne({
      user: userId,
      workspace: workspaceId,
    });
    if (member) {
      return true;
    }
    return false;
  }
}

module.exports = new MemberService(MemberModel, 'Member');

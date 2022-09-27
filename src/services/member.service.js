const CRUD = require('./factories/crud.factory');

const MemberModel = require('../models/member.model');

class MemberService extends CRUD {
  async getUserMemberships(userId) {
    return this.Model.find({ user: userId }, { user: 0 }).lean();
  }
}

module.exports = new MemberService(MemberModel, 'Member');

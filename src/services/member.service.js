const CRUD = require('./factories/crud.factory');

const MemberModel = require('../models/member.model');

class MemberService extends CRUD {}

module.exports = new MemberService(MemberModel, 'Member');

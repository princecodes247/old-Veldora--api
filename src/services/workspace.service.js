const { Container } = require('typedi');
const CRUD = require('./factories/crud.factory');

const WorkspaceModel = require('../models/workspace');

class WorkspaceService extends CRUD {
  async getAll(limit, page) {
    const _limit = Number(limit) || 10;
    const _skip = Number((page - 1) * limit) || 0;

    const result = await Promise.all([this.Model.find({}).skip(_skip).limit(_limit), this.Model.countDocuments()]);

    if (Number(page) * limit < result[1]) {
      return {
        page,
        next: page + 1,
        limit: _limit,
        workspaces: result[0],
        total: result[1],
      };
    }
    return {
      page,
      next: null,
      limit: _limit,
      workspaces: result[0],
      total: result[1],
    };
  }

  async test() {
    const eventDispatcher = Container.get('eventDispatcher');
    eventDispatcher.dispatch('users');
    return 'test';
  }
}

module.exports = new WorkspaceService(WorkspaceModel, 'Workspace');

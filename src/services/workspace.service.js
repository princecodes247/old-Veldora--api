const { Container } = require('typedi');
const CRUD = require('./factories/crud.factory');

const WorkspaceModel = require('../models/workspace');

class WorkspaceService extends CRUD {
  async test() {
    const eventDispatcher = Container.get('eventDispatcher');
    eventDispatcher.dispatch('users');
    return 'test';
  }
}

module.exports = new WorkspaceService(WorkspaceModel, 'Workspace');

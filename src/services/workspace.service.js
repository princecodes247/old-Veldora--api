const { Container } = require('typedi');
const CRUD = require('./factories/crud.factory');

const WorkspaceModel = require('../models/workspace.model');

class WorkspaceService extends CRUD {}

module.exports = new WorkspaceService(WorkspaceModel, 'Workspace');

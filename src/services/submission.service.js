const Submission = require('../models/submission.model');
const CRUD = require('./factories/crud.factory');

class SubmissionService extends CRUD {
  async getProjectSubmissions(projectId, limit, page) {
    this._paginatedQuery({ limit, page }, { project: projectId });
  }
}

module.exports = new SubmissionService(Submission, 'Submission');

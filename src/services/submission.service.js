const Submission = require('../models/submission');
const CRUD = require('./factories/crud.factory');

class SubmissionService extends CRUD {
  async getFormSubmissions(formId, limit, page) {
    this._paginatedQuery({ limit, page }, { form: formId });
  }
}

module.exports = new SubmissionService(Submission, 'Submission');

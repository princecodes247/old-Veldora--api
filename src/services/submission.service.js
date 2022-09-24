const Submission = require('../models/submission');
const CRUD = require('./factories/crud.factory');

class SubmissionService extends CRUD {
  async getFormSubmissions(formId) {
    this.Model.find({ form: formId });
  }
}

module.exports = new SubmissionService(Submission, 'Submission');

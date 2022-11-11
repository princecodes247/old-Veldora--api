const { Container } = require('typedi');
const CRUD = require('./factories/crud.factory');

const ProjectModel = require('../models/project.model');

class ProjectService extends CRUD {
  async create(data) {
    const result = new ProjectModel(data);
    await result.save().catch(err => {
      console.log('ji');
      // logger.error('🔥 error: %o', e);
      console.log('jiaaaa');
      throw new Error(err);
    });
    console.log(result);
    return {
      result,
      error: false,
    };
  }

  async editSettings(id, body) {
    const items = await this.Model.find({ owner: id }, { __v: 0 }).lean();
    console.log(items);
    return items;
  }

  async getUserProjects(id) {
    const items = await this.Model.find({ owner: id }, { __v: 0 }).lean();
    console.log(items);
    return items;
  }

  async addSubmission(id, data) {
    const project = await this.Model.findOne({ _id: id }, { __v: 0 });
    const submission = { data };
    project.submissions.push(submission);

    await project.save();

    return submission;
  }
}

module.exports = new ProjectService(ProjectModel, 'Project');

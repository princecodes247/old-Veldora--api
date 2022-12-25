const { Container } = require('typedi');
const CRUD = require('./factories/crud.factory');

const ProjectModel = require('../models/project.model');

class ProjectService extends CRUD {
  async create(data, id) {
    const result = new ProjectModel({
      ...data,
      owner: id,

      collaborators: [
        {
          user: id,
          role: 'owner',
        },
      ],
    });
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
    let project = await this.Model.findById(id);
    project = { ...project, ...body };
    await project.save();
    console.log(project);
    return project;
  }

  async getUserProjects(id, { limit, page }) {
    return await this._paginatedQuery({ limit, page }, { owner: id });
  }
}

module.exports = new ProjectService(ProjectModel, 'Project');

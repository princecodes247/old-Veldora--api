const logger = require('../loaders/logger');
const MemberService = require('../services/member.service');
const ProjectService = require('../services/project.service');

class ProjectController {
  async create(req, res, next) {
    try {
      const project = await ProjectService.create({ ...req.body, collaborators: [req.$user._id] });
      return res.json({ project }).status(200);
    } catch (e) {
      logger.error('🔥 error: %o', e);
      return next(e);
    }
  }

  async getAll(req, res, next) {
    try {
      const users = await ProjectService.getAll();
      return res.json({ users }).status(200);
    } catch (e) {
      logger.error('🔥 error: %o', e);
      return next(e);
    }
  }

  async getOne(req, res, next) {
    try {
      const project = await ProjectService.getOne(req.params.projectId);
      return res.json(project).status(200);
    } catch (e) {
      logger.error('🔥 error: %o', e);
      return next(e);
    }
  }

  async getUserProjects(req, res) {
    const projects = await ProjectService.getUserProjects(req.$user._id);

    return res.json(projects).status(200);
  }

  async addSubmission(req, res) {
    const { projectID } = req.params;
    const result = await ProjectService.addSubmission(projectID, req.body);

    // return res.json(projects).status(200);
  }
  async addCollaborator(req, res) {
    const { projectID } = req.params;
    const result = await ProjectService.addSubmission(projectID, req.body);

    // return res.json(projects).status(200);
  }
}

module.exports = new ProjectController();

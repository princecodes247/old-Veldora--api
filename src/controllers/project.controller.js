const logger = require('../loaders/logger');
const MemberService = require('../services/member.service');
const ProjectService = require('../services/project.service');
const SubmissionService = require('../services/submission.service');

class ProjectController {
  async create(req, res, next) {
    try {
      const project = await ProjectService.create(req.body, req.$user._id);
      return res.json({ project }).status(200);
    } catch (e) {
      logger.error('🔥 error: %o', e);
      return next(e);
    }
  }

  async getAll(req, res, next) {
    try {
      const projects = await ProjectService.getAll();
      return res.json({ projects }).status(200);
    } catch (e) {
      logger.error('🔥 error: %o', e);
      return next(e);
    }
  }

  async getOne(req, res, next) {
    try {
      const { limit, page } = req.query;
      const project = await ProjectService.getOne(req.params.projectId);
      const submissions = await SubmissionService.getProjectSubmissions(req.params.projectId, { limit, page });
      return res.json({ project, submissions }).status(200);
    } catch (e) {
      logger.error('🔥 error: %o', e);
      return next(e);
    }
  }

  async getUserProjects(req, res) {
    const { limit, page } = req.query;
    const projects = await ProjectService.getUserProjects(req.$user._id, { limit, page });
    return res.json(projects).status(200);
  }

  // NOT DONE
  async addCollaborator(req, res) {
    const { projectID } = req.params;
    // const result = await ProjectService.addCollaborator(projectID, req.body);

    // return res.json(result).status(201);
  }

  async delete(req, res) {
    const { projectID } = req.params;
    await ProjectService.delete(projectID);

    return res
      .json({
        message: 'Deleted Successfully',
      })
      .status(201);
  }

  // DONE (TEST)
  async editSettings(req, res) {
    const { projectID } = req.params;
    const result = await ProjectService.editSettings(projectID, req.body);

    return res.json(result).status(201);
  }
}

module.exports = new ProjectController();

const FormService = require('../services/form.service');
const MemberService = require('../services/member.service');

async function isWorkspaceMember(req, res, next) {
  try {
    if (req.$user.role === 'admin') return next();
    const formId = req?.params?.formId || req?.body?.formId;
    let workspaceId = req?.params?.workspaceId || req?.body?.workspaceId;

    if (formId) {
      const form = await FormService.getOne(formId);

      workspaceId = form.workspace;
    }

    if (await MemberService.validateInWorkspace(req.$user._id, workspaceId)) return next();

    return res.status(403).json({ message: `Not authorized to workspace` });
  } catch (error) {
    throw next(error);
  }
}

module.exports = isWorkspaceMember;

const WorkspaceService = require('../services/workspace.service');
const MemberService = require('../services/member.service');
const UserService = require('../services/user.service');
const MailService = require('../services/mail.service');

const events = require('../constants/events.constants');
const EventSubscriber = require('./EventSubscriber');
const logger = require('../loaders/logger');

const onUsers = async () => {
  console.log('testtttttt');
};

const onUserSignIn = ({ _id }) => {
  logger.info('No events');
  // try {
  //   const UserModel = Container.get('UserModel');

  //   UserModel.update({ _id }, { $set: { lastLogin: new Date() } });
  // } catch (e) {
  //   logger.error(`🔥 Error on event ${events.user.signIn}: %o`, e);

  //   // Throw the error so the process die (check src/app.ts)
  //   throw e;
  // }
};

const onUserSignUp = async ({ name, email, _id }) => {
  logger.silly(`${name} ${email} ${_id}`);

  logger.silly('Sending welcome email');
  const emailResult = await MailService.SendWelcomeEmail(email);

  logger.silly(emailResult);
  try {
    logger.silly(`Creating ${name}'s first workspace`);
    const workspace = await WorkspaceService.create({
      owner: _id,
    });
    await MemberService.create({
      user: _id,
      workspace: workspace.result._id,
      role: 'owner',
    });
  } catch (e) {
    logger.error(`🔥 Error on event ${events.user.SIGN_UP}: %o`, e);

    // Throw the error so the process dies (check src/app.ts)
    throw e;
  }
};

const UserSubscriber = eventDispatcher => {
  const eventSubscriber = new EventSubscriber(eventDispatcher);
  eventSubscriber.on(events.user.SIGN_UP, onUserSignUp);
  eventSubscriber.on(events.user.SIGN_IN, onUserSignIn);
  eventSubscriber.on('users', onUsers);
  return eventSubscriber;
};

module.exports = UserSubscriber;

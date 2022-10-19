const { Container } = require('typedi');

module.exports = class EmailSequenceJob {
  async handler(job, done) {
    const Logger = Container.get('logger');
    try {
      Logger.debug('✌️ Email Sequence Job triggered!');
      const { email, name } = job.attrs.data;
      const mailerServiceInstance = Container.get('mail.service');
      await mailerServiceInstance.SendWelcomeEmail(email);
      Logger.silly(`${name} ${email}`);
      done();
    } catch (e) {
      Logger.error('🔥 Error with Email Sequence Job: %o', e);
      done(e);
    }
  }
};

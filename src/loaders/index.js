const expressLoader = require('./express');
const mongooseLoader = require('./mongoose');
const Logger = require('./logger');
const { initializeEvents } = require('./events');

module.exports = async ({ expressApp }) => {
  const mongoConnection = await mongooseLoader();
  Logger.info('👌 DB loaded and connected!');

  initializeEvents();

  await expressLoader({ app: expressApp });
  Logger.info('👌 Express loaded');
};

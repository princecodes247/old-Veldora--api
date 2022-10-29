// const require = require('./utils/require');

const express = require('express');

const config = require('./config');

const loaders = require('./loaders');
const Logger = require('./loaders/logger');

async function startServer() {
  const app = express();

  // await require('../loaders').default({ expressApp: app });
  await loaders({ expressApp: app });

  app
    .listen(config.port, () => {
      Logger.info(`
      ################################################
      🛡️  Server listening on port: ${config.port} 🛡️
      ################################################
    `);
    })
    .on('error', err => {
      Logger.error(err);
      process.exit(1);
    });
}

startServer();

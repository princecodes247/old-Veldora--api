const express = require('express');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const { errors } = require('celebrate');

const methodOverride = require('method-override');

const routes = require('../routes');
const config = require('../config');

const COOKIE_SECRET = process.env.COOKIE_SECRET || '000';

module.exports = ({ app }) => {
  /**
   * Health Check endpoints
   * @TODO Explain why they are here
   */
  app.get('/status', (req, res) => {
    res.status(200).end();
  });
  app.head('/status', (req, res) => {
    res.status(200).end();
  });

  // Useful if you're behind a reverse proxy (Heroku, Bluemix, AWS ELB, Nginx, etc)
  // It shows the real origin IP in the heroku or Cloudwatch logs
  app.enable('trust proxy');

  // The magic package that prevents frontend developers going nuts
  // Alternate description:
  // Enable Cross Origin Resource Sharing to all origins by default
  app.use(cors());

  // Some sauce that always add since 2014
  // "Lets you use HTTP verbs such as PUT or DELETE in places where the client doesn't support it."
  // Maybe not needed anymore ?
  app.use(methodOverride());

  // Secure the app by setting various HTTP headers off.
  // app.use(helmet({ contentSecurityPolicy: false }));

  // Secure the app by setting various HTTP headers off.
  // app.use(helmet({ contentSecurityPolicy: false }));

  // Cookie Parser
  app.use(cookieParser(COOKIE_SECRET));

  // Transforms the raw string of req.body into json
  app.use(express.json());

  // Load API routes
  app.use('', routes());

  // celebrate error handler
  app.use(errors());

  /// catch 404 and forward to error handler
  app.use((req, res, next) => {
    const err = new Error('Not Found');
    err.status = 404;
    next(err);
  });

  /// error handlers
  app.use((err, req, res, next) => {
    /**
     * Handle 401 thrown by express-jwt library
     */
    if (err.name === 'UnauthorizedError') {
      return res.status(err.status).json({ message: err.message }).end();
    }
    if (err.code === 11000) {
      const message = Object.keys(err.keyValue).map(key => `${key}: ${err.keyValue[key]} already exists`);
      return res.status(400).json({ message }).end();
    }
    return next(err);
  });

  app.use((err, req, res, next) => {
    res.status(err.status || 500);
    res.json({
      errors: {
        message: err.message,
      },
    });
  });
};

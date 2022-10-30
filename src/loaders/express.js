const express = require('express');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const { errors } = require('celebrate');
const rateLimit = require('express-rate-limit');
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
  // const corsOptions = {
  //   origin: 'http://localhost:5173',
  //   credentials: true, //access-control-allow-credentials:true
  //   optionSuccessStatus: 200,
  // };
  // app.use(cors(corsOptions));

  const whitelist = ['http://localhost:3000', 'http://localhost:5173'];

  app.use(
    cors({
      origin: whitelist,
      credentials: true,
    })
  );

  // Some sauce that always add since 2014
  // "Lets you use HTTP verbs such as PUT or DELETE in places where the client doesn't support it."
  // Maybe not needed anymore ?
  app.use(methodOverride());

  // Secure the app by setting various HTTP headers off.
  // app.use(helmet({ contentSecurityPolicy: false }));

  // Cookie Parser
  app.use(cookieParser(COOKIE_SECRET));

  // Transforms the raw string of req.body into json
  app.use(express.json());

  const apiLimiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 100, // Limit each IP to 100 requests per `window` (here, per 15 minutes)
    standardHeaders: true, // Return rate limit info in the `RateLimit-*` headers
    legacyHeaders: false, // Disable the `X-RateLimit-*` headers
  });

  // Apply the rate limiting middleware to API calls only
  app.use('', apiLimiter);
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

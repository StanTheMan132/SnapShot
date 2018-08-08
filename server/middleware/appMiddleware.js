const bodyParser = require('body-parser');
const morgan = require('morgan');
const corsMiddleware = require('./headerMiddleware/corsMiddleware');
const getCurrentDatetime = require('../utils/getCurrentDatetime');

module.exports = function setupMiddleware(app) {
  //  disable x-powered-by for security reasons
  app.disable('x-powered-by');
  //  middleware to allow cross-origin resource sharing
  app.use(corsMiddleware());
  app.use(bodyParser.urlencoded({ extended: false }));
  app.use(bodyParser.json());
  app.use(morgan((tokens, req, res) => {
    return [
      //  self made function to get current local machine time instead of UTC+0
      getCurrentDatetime(),
      tokens.method(req, res),
      tokens.url(req, res),
      tokens.status(req, res),
      tokens.res(req, res, 'content-length'), '-',
      tokens['response-time'](req, res), 'ms',
    ].join(' ');
  }));
};

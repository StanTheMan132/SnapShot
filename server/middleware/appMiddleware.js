const bodyParser = require('body-parser');
const morgan = require('morgan');
const corsMiddleware = require('./headerMiddleware/corsMiddleware');

module.exports = function setupMiddleware(app) {
  //  middleware to allow cross-origin resource sharing
  app.use(corsMiddleware());
  app.use(bodyParser.urlencoded({ extended: false }));
  app.use(bodyParser.json());
};

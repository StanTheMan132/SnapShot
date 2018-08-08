const express = require('express');
const setupMiddleware = require('./middleware/appMiddleware');
const startDatabase = require('./database');
const seedDatabase = require('./utils/seedDatabase');
const errorHandler = require('./utils/errorHandler');
const api = require('./api/api');

const app = express();

//  will attach/setup body-parser and morgan
setupMiddleware(app);
//  starts the database
startDatabase();

if (process.env.NODE_ENV !== 'prod') {
  seedDatabase();
}
//  Routes
app.use('/api', api);

//  if no route is hit
app.use((req, res, next) => {
  res.status(404).json({
    status: 404,
    message: 'Resource not found',
  });
});

//  global express error handler
app.use(errorHandler());

module.exports = app;

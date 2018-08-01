const mongoose = require('mongoose');
const config = require('./config/config');

const connectionString = `mongodb://${config.db.host}:${config.db.port}/${config.db.name}`;

function startDatabase() {
  try {
    mongoose.connect(connectionString);
  } catch (error) {
    console.log(error);
  }
}

module.exports = startDatabase;

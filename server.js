const dotenv = require('dotenv').config();
const http = require('http');
const app = require('./server/app');
const config = require('./server/config/config');

const server = http.createServer(app);

server.listen(config.app.port);

console.log(`server started on port ${config.app.port}`);

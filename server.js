const dotenv = require('dotenv').config();
const http = require('http');
const app = require('./server/app');

const port = parseInt(process.env.PORT, 10) || 3000;

const server = http.createServer(app);
server.listen(port);
console.log('server running');
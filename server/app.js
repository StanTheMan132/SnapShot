const express = require('express');
const bodyParser = require('body-parser');
const morgan = require('morgan');
const api = require('./api/api');


const app = express();

//  req paramaters
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

//  Log
app.use(morgan('dev'));



//  Routes

app.use('/api', api);

app.get('/', (req, res) => {
  res.status(200).send('GOOD LUCK MY FRIENDS AND LETS GET THIS GOING');
});



app.use((req, res, next) => {
  res.status(404).send('route doesnt exist yet m8');
});

module.exports = app;

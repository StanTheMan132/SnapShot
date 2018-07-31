const express = require('express');
const bodyParser = require('body-parser');
const morgan = require('morgan');
const mongoose = require('mongoose');
const passport = require('passport');
const config = require('./config/database');
const User = require('./api/auth/userModel');
const jwt = require('jwt-simple');
const port = process.env.PORT;

const app = express();

//req paramaters
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

//Log
app.use(morgan('dev'));

//use passport.js
app.use(passport.initialize());

//Routesx
app.get('/', (req, res) => {
  res.status(200).send('GOOD LUCK MY FRIENDS AND LETS GET THIS GOING');
});









app.use((req, res, next) => {
  res.status(404).send('route doesnt exist yet m8');
});

module.exports = app;

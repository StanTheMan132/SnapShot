const mongoose = require('mongoose');
const express = require('express');
const passport = require('passport');
const config = require('../../config/database');
const auth = require('./authController');

const addUser = auth.addUser;
const authUser = auth.authUser;

const authRoutes = express.Router();

mongoose.connect(config.database);

require('../../config/passport')(passport);


//  use passport.js
authRoutes.use(passport.initialize());

authRoutes.post('/signup', (req, res) => { addUser(req, res); });

authRoutes.post('/login', (req, res) => { authUser(req, res); });


module.exports = authRoutes;

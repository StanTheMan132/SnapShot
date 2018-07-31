const mongoose = require('mongoose');
const express = require('express');
const passport = require('passport');
const config = require('../../config/database');
const checkAuth = require('./authController');

const authRoutes = express.Router();

mongoose.connect(config.database);

require('../../config/passport')(passport);


//  use passport.js
authRoutes.use(passport.initialize());

authRoutes.post('/signup', (req, res) => { checkAuth(req, res); });


module.exports = authRoutes;

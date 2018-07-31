const mongoose = require('mongoose');
const User = require('./userModel');
const config = require('../../config/database');
const checkAuth = require("./authController");
const passport = require("passport");


mongoose.connect(config.database)

require('../../config/passport')(passport);



var authRoutes = require("express").Router();

//use passport.js
authRoutes.use(passport.initialize());

authRoutes.route('/signup', checkAuth);


module.exports = authRoutes;
const express = require('express');
const passport = require('passport');
const auth = require('./authController');

const authRoutes = express.Router();

//  routes
authRoutes.route('/signup')
  .post(auth.addUser);

authRoutes.route('/login')
  .post(auth.authUser);

authRoutes.route('/forgotpassword')
  .post(auth.newPassword);


module.exports = authRoutes;

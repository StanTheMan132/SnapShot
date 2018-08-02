const express = require('express');
const auth = require('./authController');

const authRoutes = express.Router();

//  routes
authRoutes.route('/signup')
  .post(auth.addUser);

authRoutes.route('/login')
  .post(auth.authUser);

authRoutes.route('/forgotpassword')
  .post(auth.newPassword);

authRoutes.route('/me')
  .delete(auth.deleteUser)
  .get(auth.getUser);


module.exports = authRoutes;

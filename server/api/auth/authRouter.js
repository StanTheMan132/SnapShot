const express = require('express');
const auth = require('./authController');
const authMiddelware = require('../../middleware/authMiddelware/authMiddelware');

const authRoutes = express.Router();

//  routes
authRoutes.route('/signup')
  .post(auth.addUser);

authRoutes.route('/login')
  .post(auth.authUser);

authRoutes.route('/forgotpassword')
  .post(auth.newPassword);

authRoutes.use(authMiddelware);

authRoutes.route('/me')
  .delete(auth.deleteUser)
  .get(auth.getUserData);


module.exports = authRoutes;

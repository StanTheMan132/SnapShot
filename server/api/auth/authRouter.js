const express = require('express');
const auth = require('./authController');
const verifyToken = require('../../middleware/authMiddelware/authMiddelware');

const authRoutes = express.Router();

//  routes
authRoutes.route('/signup')
  .post(auth.addUser);

authRoutes.route('/login')
  .post(auth.authUser);

authRoutes.route('/forgotpassword')
  .post(auth.newPassword);


authRoutes.route('/me')
  .all(verifyToken)
  .delete(auth.deleteUser)
  .get(auth.getUserData);


module.exports = authRoutes;

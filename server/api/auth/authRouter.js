const express = require('express');
const auth = require('./authController');
const verifyToken = require('../../middleware/authMiddelware/verifyToken');

const authRoutes = express.Router();

// routes

//  http://localhost/api/auth/signup
authRoutes.route('/signup')
  .post(auth.addUser);

//  http://localhost/api/auth/login
authRoutes.route('/login')
  .post(auth.authUser);

//  http://localhost/api/auth/forgotpassword
authRoutes.route('/forgotpassword')
  .post(auth.newPassword);

//  http://localhost/api/auth/me
authRoutes.route('/me')
  .all(verifyToken())
  .delete(auth.deleteUser)
  .get(auth.getUserData)
  .patch(auth.patchUser);


module.exports = authRoutes;

const express = require('express');
const passport = require('passport');
const auth = require('./authController');

const { addUser } = auth;
const { authUser } = auth;
const { newPassword } = auth;

const authRoutes = express.Router();


//  use passport.js
//  authRoutes.use(passport.initialize());

//  routes
authRoutes.post('/signup', (req, res) => { addUser(req, res); });

authRoutes.post('/login', (req, res) => { authUser(req, res); });

authRoutes.post('/forgotpassword', (req, res) => { newPassword(req, res); });


module.exports = authRoutes;

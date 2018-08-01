const express = require('express');
const passport = require('passport');
const auth = require('./authController');

const { addUser } = auth;
const { authUser } = auth;

const authRoutes = express.Router();


//  use passport.js
authRoutes.use(passport.initialize());

authRoutes.post('/signup', (req, res) => { addUser(req, res); });

authRoutes.post('/login', (req, res) => { authUser(req, res); });


module.exports = authRoutes;

const jwt = require('jsonwebtoken');
const User = require('../api/auth/userModel');
const config = require('../config/config');
const authFunctions = require('../api/auth/authFunctions');



authFunctions.authenticateUser("test", "test");



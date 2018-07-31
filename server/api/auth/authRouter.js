const mongoose = require('mongoose');
const User = require('./userModel');
const config = require('../config/database');
const checkAuth = require("./authController");

mongoose.connect(config.database)

require('../config/passport')(passport);

var authRoutes = express.Router();

authRoutes.route('/signup', checkAuth(req, res));


module.exports = authRoutes;
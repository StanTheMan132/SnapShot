const mongoose = require('mongoose');
const User = require('./userModel');
const config = require('../config/database');

mongoose.connect(config.database)

require('../config/passport')(passport);

var authRoutes = express.Router();

authRoutes.post('/signup', function(req, res){
    console.log(req.body.username);
    console.log(req.body.password);
    if(!req.body.username || !req.body.password){
      res.json({succes: false, msg: "No name/password found"})
    } else {
      var newUser = new User({
        userName: req.body.username,
        password: req.body.password
      });
      newUser.save(function(err){
        if(err){
          res.json({succes: false, msg: "Something goofed: " + err})
        } else {
          res.json({succes: true, msg: "Created New User"})
        }
      });
    }
  });


module.exports = authRoutes;
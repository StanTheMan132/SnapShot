const User = require('./userModel');

const checkAuth = function (req, res) {
  if(!req.body.username || !req.body.password) {
    res.json({success: false, msg: 'No name/password found' });
  } else {
    const newUser = new User({
      userName: req.body.username,
      password: req.body.password
    });
    newUser.save(function(err){
    if (err) {
        res.json({success: false, msg: "Something goofed: " + err});
    } else  {
        res.json({success: true, msg: "Created New User"});
    }
    });
  }
}


module.exports = checkAuth;

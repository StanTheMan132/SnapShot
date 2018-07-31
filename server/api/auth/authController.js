

const checkAuth = function(req, res){

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

}

module.exports = checkAuth;
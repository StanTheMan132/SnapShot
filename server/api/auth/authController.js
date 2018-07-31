const jwt = require('jwt-simple');
const User = require('./userModel');
const config = require('../../config/database');


const addUser = function addUser(req, res) {
  if (!req.body.username || !req.body.password) {
    res.json({ success: false, msg: 'No name/password found' });
  } else {
    const newUser = new User({
      username: req.body.username,
      password: req.body.password,
    });
    newUser.save((err) => {
      if (err) {
        res.json({ success: false, msg: `Something goofed: ${err}` });
      } else {
        res.json({ success: true, msg: 'Created New User' });
      }
    });
  }
}

const authUser = function authUser(req, res) {
  User.findOne({
    username: req.body.username,
  }, (err, user) => {
    if (err) throw err;
    console.log(req.body.username);
    if (!user) {
      res.status(403).send({ success: false, msg: 'Auth Failed User Not Found' });
    } else {
      user.comparePasswords(req.body.password, (err, isMatch) => {
        if (isMatch && !err) {
          const token = jwt.encode(user, config.secret);

          res.json({ success: true, token: `JWT ${token}` });
        } else {
          res.status(403).send({ success: false, msg: 'Auth Failed Wrong Password' });
        }
      });
    }
  });
};


module.exports.addUser = addUser;
module.exports.authUser = authUser;

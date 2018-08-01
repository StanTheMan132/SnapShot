const jwt = require('jsonwebtoken');
const User = require('./userModel');
const config = require('../../config/config');

exports.addUser = function addUser(req, res) {
  if (!req.body.username || !req.body.password) {
    console.log(req.body);
    res.json({ success: false, msg: 'No name/password found' });
  } else {
    const newUser = new User({
      username: req.body.username,
      password: req.body.password,
      email: req.body.email,
      permissions: 'read',
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

exports.authUser = function authUser(req, res) {
  User.findOne({
    username: req.body.username,
  }, (err, user) => {
    if (err) throw err;
    if (!user) {
      res.status(403).send({ success: false, msg: 'Auth Failed User Not Found' });
    } else {
      user.comparePasswords(req.body.password, (err, isMatch) => {
        if (isMatch && !err) {
          const payload = {
            id: user._id,
          };
          const token = jwt.sign(payload, config.jwt.secret);

          res.json({ success: true, token: token });
        } else {
          res.status(403).send({ success: false, msg: 'Auth Failed Wrong Password' });
        }
      });
    }
  });
};

exports.newPassword = function updatePassword(req, res) {
  User.findOne({
    username: req.body.username,
  }, (err, user) => {
    if (err) {
      res.json({ success: false, msg: err });
    }
    if (!user) {
      res.status(403).send({ success: false, msg: 'User not found' });
    } else {
      user.set({ password: req.body.password });
      user.save((err) => {
        if (err) {
          res.json({ msg: err });
        } else {
          res.json({ success: true, msg: 'Password Changed' });
        }
      });
    }
  });
};

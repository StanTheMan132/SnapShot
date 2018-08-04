const jwt = require('jsonwebtoken');
const User = require('./userModel');
const config = require('../../config/config');

let userObject = '';

function findUser(id) {
  return new Promise((resolve, reject) => {
    User.findById(id, (err, user) => {
      if (!err) {
        userObject = user;
        resolve();
      } else {
        reject(err);
      }
    });
  });
}


exports.addUser = function addUser(req, res) {
  if (!req.body.username || !req.body.password) {
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
};

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
          const token = jwt.sign(payload, config.jwt.secret, {
            expiresIn: 30 * 60,
          });

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


exports.deleteUser = function deleteUser(req, res) {
  User.findOne({
    username: req.body.username,
  }, (err, user) => {
    if (err) {
      res.json({ success: false, msg: err });
    }

    if (!user) {
      res.status(403).send({ success: false, msg: 'User not Found' });
    } else {

      user.comparePasswords(req.body.password, (err, isMatch) => {
        ;
        if (isMatch && !err) {
          User.findByIdAndRemove(user._id, (err, user) => {
            if (err) {
              res.json({ success: false, msg: err });
            } else {
              res.json({ success: true, msg: `User ${user.username} deleted` });
            }
          });  
        } else {
          res.json({ success: false, msg: `Could not authenticate password err: ${err}` });
        }
      });
    }
  });
};


exports.getUserData = function getUserData(req, res) {
  findUser(req.user.id).then(() => {
    res.json({ success: true, username: userObject.username, email: userObject.email });
  })
    .catch(err => res.json({ success: false, msg: err }));
};

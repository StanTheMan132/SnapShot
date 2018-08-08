const jwt = require('jsonwebtoken');
const User = require('./userModel');
const config = require('../../config/config');


exports.addUser = async function addUser(req, res) {
  if (!req.body.username || !req.body.password) {
    res.json({ success: false, msg: 'No name/password found' });
  } else {
    const newUser = new User({
      username: req.body.username,
      password: req.body.password,
      email: req.body.email,
      permissions: 'read',
    });
    try {
      await newUser.save();
      res.status(201).json({ success: true, msg: 'Created New User' });
    } catch (err) {
      res.json({ success: false, msg: `Something goofed: ${err}` });
    }
  }
};

exports.authUser = async function authUser(req, res, next) {
  if (!req.body.username || !req.body.password) {
    res.json({ success: false, msg: 'No username/password found' });
  } else {
    try {
      const foundUser = await User.findOne({ username: req.body.username });
      if (!foundUser) {
        res.status(401).json({ success: false, msg: 'User not found' });
        return;
      }
      const matching = await foundUser.authenticate(req.body.password);
      if (matching) {
        const payload = {
          id: foundUser._id,
        };
        const token = jwt.sign(payload, config.jwt.secret, {
          expiresIn: config.jwt.expires,
        });
        res.status(200).json({ success: true, token });
      } else {
        res.status(401).json({ succes: false, msg: 'Failed to authenticate password' });
      }
    } catch (err) {
      next(err);
    }
  }
};


exports.newPassword = async function updatePassword(req, res) {
  try {
    const foundUser = await User.findOne({ username: req.body.username });
    foundUser.set({ password: req.body.password });
    foundUser.save();
    res.send({ success: true, msg: 'Password Changed' });
  } catch (err) {
    res.status(500).send({ success: true, msg: err });
  }
};


exports.deleteUser = async function deleteUser(req, res) {
  try {
    const foundUser = await User.findOne({ username: req.body.username });
    const matchingPasswords = await foundUser.authenticate(req.body.password);
    if (matchingPasswords) {
      await User.findByIdAndRemove(foundUser._id);
      res.json({ success: true, msg: `User ${foundUser.username} deleted` })
    }
  } catch (err) {
    console.log(err);
    res.status(500).send({ success: false, msg: err });
  }
};

exports.getUserData = async function getUserData(req, res, next) {
  try {
    const foundUser = await User.findById(req.user.id);
    if (foundUser) {
      res.status(200).json({ succes: true, username: foundUser.username, email: foundUser.email });
    } else {
      res.status(204).json({});
    }
  } catch (error) {
    next(error);
  }
};

exports.patchUser = async function patchUser(req, res) {
  try {
    const updatedObject = req.body;
    const { id } = req.user;
    await User.update({ _id: id }, { $set: updatedObject });
    res.status(204).send();
  } catch (err) {
    res.status(500).json({ succes: false });
  }
};

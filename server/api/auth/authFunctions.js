const jwt = require('jsonwebtoken');
const User = require('./userModel');
const config = require('../../config/config');

exports.authenticateUser = async function authenticateUser(username, password) {
  try {
    console.log('working');
    const foundUser = await User.findOne({ username });
    console.log('test');
    if (!foundUser) {
      return 'User not Found';
    }
    const matching = await foundUser.authenticate(password);
    if (matching) {
      const payload = {
        id: foundUser._id,
      };
      const token = jwt.sign(payload, config.jwt.secret, {
        expiresIn: config.jwt.expires,
      });
      const result = {
        status: 'Success',
        token,

      };
      return result;
    }
    return 'Failed to authenticate password';
  } catch (err) {
    return err;
  }
};

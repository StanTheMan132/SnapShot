const jwt = require('jsonwebtoken');
const config = require('../../config/config');

exports.authenticateUser = async function authenticateUser(username, password, User) {
  try {
    const foundUser = await User.findOne({ username });
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

exports.newUser = async function newUser(username, password, email, User) {
  const newUserObject = new User({
    username,
    password,
    email,
    permissions: 'read',
  });
  try {
    await newUserObject.save();
    return { success: true, msg: 'Created New User' };
  } catch (err) {
    return { success: false, msg: `Something goofed: ${err}` };
  }
}

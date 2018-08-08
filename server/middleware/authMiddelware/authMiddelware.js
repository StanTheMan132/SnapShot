const jwt = require('jsonwebtoken');
const config = require('../../config/config');


module.exports = function verifyToken(req, res, next) {
  const token = req.headers['x-access-token'];

  if (token) {
    jwt.verify(token, config.jwt.secret, (err, decoded) => {
      if (err) {
        return res.json({ success: false, msg: 'failed to authenticate token' });
      }
     
      req.user = decoded;
      next();
      
    });
  } else {
    res.status(403).send({ success: false, msg: 'No token found' });
  }
};


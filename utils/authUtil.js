const jwt = require('jsonwebtoken');
const config = require('../config/jwt');

function verifyToken(token) {
  return jwt.verify(token, config.secret, function(err, decoded) {
      if (err) {
        throw new Error(err)
      } else {
        return decoded
      }
  });
}

function generateToken(user) {
    return jwt.sign({ email: user.email }, config.secret, { expiresIn: '1h' });
}

module.exports = { verifyToken , generateToken};

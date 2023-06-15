const { verifyToken } = require('../utils/authUtil');
const { StatusCodes } = require('http-status-codes');
/*
  The best practice due to RFC 7231 standard
  is to return 404 on most routes instead of 401 
  to keep our business secured.
*/

async function authMiddleware(req, res, next) {
  try {
    const authorizationHeader = req.headers.authorization;

    if (!authorizationHeader) {
      return res.status(StatusCodes.UNAUTHORIZED).json({ error: 'Not authorized' });
    }

    const splitToken = authorizationHeader.split(' ');
    let bearerToken;

    if (splitToken.length === 2 && (splitToken[0] === 'Bearer' || splitToken[0] === 'bearer')) {
      bearerToken = splitToken[1];
    } else {
      return res
        .status(StatusCodes.BAD_REQUEST)
        .json({ error: 'Invalid authorization token format' });
    }

    if (!bearerToken) {
      return res.status(StatusCodes.UNAUTHORIZED).json({ error: 'Not authorized' });
    }

    const decoded = await verifyToken(bearerToken);
    req.auth = { id: decoded.id, email: decoded.email };

    next();
  } catch (error) {
    return res.status(StatusCodes.UNAUTHORIZED).json({ error: error.message });
  }
}

module.exports = authMiddleware;

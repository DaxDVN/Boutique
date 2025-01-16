const {JWT_SECRET, verifyToken} = require("../utils/jwtHelper");
const authenticate = (req, res, next) => {
  const authorization = req.headers['authorization'];
  if (!authorization) {
    return res.status(401).json({message: 'Missing authorization'});
  }
  const accessToken = authorization.split(' ')[1];
  if (!accessToken) {
    return res.status(401).json({message: 'Missing accessToken'});
  }

  const decodedToken = verifyToken(accessToken, JWT_SECRET)

  req.user = {
    userId: decodedToken.userId,
    email: decodedToken.email,
    role: decodedToken.role,
  };
  next()
}

const authorize = (allowRoles) => (req, res, next) => {
  if (!allowRoles.includes(req.user.role)) {
    return res.status(401).json({message: 'Access denied'});
  }
  next()
}

module.exports = {authenticate, authorize};
const jwt = require('jsonwebtoken')
const { SECRET_KEY } = require("./config");

const JWT_SECRET = SECRET_KEY

const generateToken = async (user) => {
  return await jwt.sign({
    userId: user._id,
    email: user.email,
    role: user.role,
  }, JWT_SECRET, {expiresIn: '1h'})
}

const verifyToken = (token) => {
  try {
    return jwt.verify(token, JWT_SECRET)
  } catch (error) {
    throw new Error("Invalid or expired token")
  }
}

module.exports = {generateToken, JWT_SECRET, verifyToken}
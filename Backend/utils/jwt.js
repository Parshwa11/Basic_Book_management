const jwt = require("jsonwebtoken");
require("dotenv").config();
const secret = process.env.SECRET || "your_secret_key";

const generateToken = (user) => {
  return jwt.sign({ id: user._id, role: user.role }, secret, {
    expiresIn: "1h",
  });
};

const verifyToken = (token) => {
  try {
    return jwt.verify(token, secret);
  } catch (error) {
    return null;
  }
};

module.exports = { generateToken, verifyToken };

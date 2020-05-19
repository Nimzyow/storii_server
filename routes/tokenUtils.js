// a funciton that returns a token
const jwt = require("jsonwebtoken");
const config = require("../.config");

const generateToken = (payload, handleToken) => {
  jwt.sign(payload, config.jwtSecret, { expiresIn: 360000 }, (err, token) => {
    if (err) {
      return false;
    }
    handleToken(token);
  });
};

const verifyToken = (token) => jwt.verify(token, config.jwtSecret);


module.exports = {
  generateToken,
  verifyToken,
};

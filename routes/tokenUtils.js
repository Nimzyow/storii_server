// a funciton that returns a token
const jwt = require("jsonwebtoken");
const config = require("../.config");

const generateToken = (payload) => new Promise((resolve, reject) => {
  jwt.sign(payload, config.jwtSecret, { expiresIn: 360000 }, (err, token) => {
    if (err) {
      reject(err);
    }
    resolve(token);
  });
});

const verifyToken = (token) => jwt.verify(token, config.jwtSecret);


module.exports = {
  generateToken,
  verifyToken,
};

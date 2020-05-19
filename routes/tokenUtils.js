// a funciton that returns a token
const jwt = require("jsonwebtoken");
const config = require("../.config");

const generateToken = (payload, res) => {
  jwt.sign(payload, config.jwtSecret, { expiresIn: 360000 }, (err, token) => {
    if (err) {
      return res.status(501).json({ msg: "Token generator failed" });
    }
    return res.json({ token });
  });
};

const verifyToken = (token) => jwt.verify(token, config.jwtSecret);


module.exports = {
  generateToken,
  verifyToken,
};

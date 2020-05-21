const jwt = require("jsonwebtoken");

const generateToken = (id) => new Promise((resolve, reject) => {
  const payload = {
    user: {
      id,
    },
  };
  // console.log("what is the payload?", payload);
  // console.log("what is the ID <AM???", id);
  jwt.sign(payload, process.env.storiiJwtSecret, { expiresIn: 360000 }, (err, token) => {
    if (err) {
      reject(err);
    }
    resolve(token);
  });
});

const verifyToken = (token) => jwt.verify(token, process.env.storiiJwtSecret);

module.exports = {
  generateToken,
  verifyToken,
};

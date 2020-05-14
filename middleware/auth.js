const jwt = require("jsonwebtoken");
const config = require("../.config");


// eslint-disable-next-line consistent-return
module.exports = (req, res, next) => {
  const token = req.header("x-auth-token");
  if (!token) {
    return res.status(401).json({ msg: "Invalid credientials" });
  }

  try {
    const decoded = jwt.verify(token, config.jwtSecret);

    req.user = decoded.user;

    next();
  } catch (err) {
    return res.status(401).json({ msg: "You need to sign in!" });
  }
};

const jwt = require("jsonwebtoken");
const config = require("../.config");


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
  return res.status(401).json({ msg: "Something went wrong...soz" });
};

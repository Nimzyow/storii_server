const tokenUtils = require("../routes/tokenUtils");

// eslint-disable-next-line consistent-return
module.exports = (req, res, next) => {
  const token = req.header("x-auth-token");
  if (!token) {
    return res.status(401).json({ msg: "Invalid credientials" });
  }

  try {
    const decoded = tokenUtils.verifyToken(token);
    req.user = decoded.user;

    next();
  } catch (err) {
    return res.status(401).json({ msg: "You need to sign in!" });
  }
};

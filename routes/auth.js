const express = require("express");
const { check, validationResult } = require("express-validator");

const User = require("../models/User");
const auth = require("../middleware/auth");
const tokenUtils = require("./tokenUtils");
const passwordUtils = require("./passwordUtils");

const router = express.Router();

// @route   GET /auth
// @desc    Get logged in user
// @access  Private
router.get("/", auth, async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select("-password");
    return res.json(user);
  } catch (err) {
    // eslint-disable-next-line no-console
    console.error(err.message);
    return res.status(401).json({ msg: "You need to sign in!" });
  }
});

// @route  POST /auth
// @desc   Authorize the user and give back a token
// @access Public
router.post(
  "/",
  [
    check("email", "Please enter an email").isEmail(),
    check("password", "Please enter a password").exists(),
  ],
  // eslint-disable-next-line consistent-return
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { email, password } = req.body;

    try {
      const user = await User.findOne({ email });
      if (!user) {
        return res.status(401).json({ msg: "Invalid credentials" });
      }
      const isMatch = await passwordUtils.compare(password, user.password);

      if (!isMatch) {
        return res.status(401).json({ msg: "Incorrect password" });
      }

      const payload = {
        user: {
          id: user.id,
        },
      };

      return tokenUtils.generateToken(payload, res);
    } catch (err) {
      // eslint-disable-next-line no-console
      console.error(err.message);
      return res.status(500).send("Connection error");
    }
  },
);

module.exports = router;

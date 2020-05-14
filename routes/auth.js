const express = require("express");
const { check, validationResult } = require("express-validator");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const config = require("../.config.js");
const User = require("../models/User");

const router = express.Router();

// @route   GET /auth
// @desc    Get logged in user
// @access  Private

// @route  POST /auth
// @desc   Authorize the user and give back a token
// @access Public

router.post(
  "/",
  [
    check("email", "Please enter an email").isEmail(),
    check("password", "Please enter a password").exists(),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(422).json({ errors: errors.array() });
    }

    const { email, password } = req.body;

    try {
      const user = await User.findOne({ email });
      if (!user) {
        return res.status(401).json({ msg: "Invalid credentials" });
      }
      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch) {
        return res.status(401).json({ msg: "Invalid credentials" });
      }

      const payload = {
        user: {
          id: user.id,
        },
      };

      jwt.sign(payload, config.jwtSecret, { expiresIn: 360000 }, (err, token) => {
        if (err) {
          return res.status(501).json({ msg: "Token generator failed" });
        }
        return res.json({ token });
      });
    } catch (err) {
      // eslint-disable-next-line no-console
      console.error(err.message);
      return res.status(500).send("Connection error");
    }
    return res.status(500).send("Connection error");
  },
);

module.exports = router;

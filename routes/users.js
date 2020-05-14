const express = require("express");
const { check, validationResult } = require("express-validator");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const config = require("../.config.js");
const User = require("../models/User");

const router = express.Router();

// @route  POST /users
// @desc   Registers a new user
// @access Public

router.post("/",
  [
    check("penName", "Please enter a pen name").exists(),
    check("email", "Please enter an email").isEmail(),
    check("password", "Please enter a password").exists(),
  ], async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { email, password } = req.body;

    try {
      let user = await User.findOne({ email });
      if (user) {
        return res.status(401).json({ msg: "email already exists" });
      }

      const salt = await bcrypt.genSalt(10);

      const encyptedPassword = await bcrypt.hash(password, salt);

      const userToSave = new User({
        ...req.body,
        password: encyptedPassword,
      });

      user = await userToSave.save();

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
      res.status(500).status("server error");
    }

    return res.status(500).send("Connection error");
  });

module.exports = router;

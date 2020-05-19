const express = require("express");
const { check, validationResult } = require("express-validator");

const User = require("../models/User");
const tokenUtils = require("./tokenUtils");
const passwordUtils = require("./passwordUtils");

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


      const encyptedPassword = await passwordUtils.encrypt(password);

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

      try {
        const token = await tokenUtils.generateToken(payload);
        return res.json({ token });
      } catch (error) {
        console.error(error);
        res.statusCode(501).json({ msg: "Token generation failed" });
      }
    } catch (err) {
      console.error(err);
      res.status(500).status("server error");
    }
  });

module.exports = router;

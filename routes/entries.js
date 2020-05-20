const express = require("express");
const { check, validationResult } = require("express-validator");

const router = express.Router();
const auth = require("../middleware/auth");

const Entry = require("../models/Entry");

router.post("/:id/entry",
  [
    auth,
    [check("content", "An entry needs content!").notEmpty()],
  ], async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    try {
      const entry = new Entry({
        ...req.body,
        writer: req.user.id,
        storiiId: req.params.id,
      });

      await entry.save();

      return res.status(200).json({ msg: "New entry successful!" });
    } catch (err) {
      console.error(err);
      return res.status(500).json({ msg: "Server error" });
    }
  });

module.exports = router;

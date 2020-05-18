const express = require("express");
const { check, validationResult } = require("express-validator");

// const Storii = require("../models/Storii");
const auth = require("../middleware/auth");

const router = express.Router();

// @route  POST /storii
// @desc   Creates a new Storii
// @access Private

router.post("/", [
  auth,
  [
    check("owner", "Owner required").exists(),
    check("title", "A Storii needs a title")
      .notEmpty(),
    check("mainGenre", "A Storii needs a main genre").notEmpty()],
], async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
});

module.exports = router;

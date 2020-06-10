const express = require("express");
const { check, validationResult } = require("express-validator");

const Storii = require("../models/Storii");
const auth = require("../middleware/auth");

const router = express.Router();

// @route  POST /storii
// @desc   Creates a new Storii
// @access Private
router.post(
  "/",
  [
    auth,
    [
      check("title", "A Storii needs a title").notEmpty(),
      check("mainGenre", "A Storii needs a main genre").notEmpty(),
    ],
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    try {
      const storii = new Storii({ ...req.body, owner: req.user.id });

      const savedStorii = await storii.save();

      return res.json(savedStorii);
    } catch (err) {
      console.error(err);
      return res.json({ msg: "Could not save Storii" });
    }
  },
);

// @route  GET /storii/:id
// @desc   Retrieves a storii
// @access Public

router.get("/:id", async (req, res) => {
  try {
    const storii = await Storii.findById(req.params.id).populate({
      path: "entries",
      populate: { path: "writer" },
    });

    if (!storii) {
      return res.status(404).json({ msg: "Page not found" });
    }
    return res.json(storii);
  } catch (err) {
    console.error(err);
    return res.status(404).json({ msg: "Page not found" });
  }
});

router.delete("/:id", auth, async (req, res) => {
  try {
    const storii = await Storii.findById(req.params.id);
    if (!storii) {
      return res.status(404).json({ msg: "Page not found" });
    }

    if (storii.owner.toString() !== req.user.id) {
      return res
        .status(401)
        .json({ msg: "User not authorized to delete this storii" });
    }

    await Storii.findByIdAndRemove(req.params.id);

    return res.json({ msg: "Storii removed" });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ msg: "Server error" });
  }
});

module.exports = router;

const express = require("express");
const { check, validationResult } = require("express-validator");

const router = express.Router();
const auth = require("../middleware/auth");

const Storii = require("../models/Storii");
const Entry = require("../models/Entry");

const isUserAllowed = async (storiiId, userId) => {
  const storii = await Storii.findById(storiiId);

  const writerIds = storii.writers.map((writer) => writer.id.toString());
  const allWriters = [storii.owner.toString(), ...writerIds];

  if (allWriters.includes(userId.toString())) {
    return true;
  }
  return false;
};

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

      return res.status(200).json({
        msg: "New entry successful!",
        entry,
      });
    } catch (err) {
      console.error(err);
      return res.status(500).json({ msg: "Server error" });
    }
  });

router.get("/:id/entry/:entryId", auth, async (req, res) => {
  const isAllowed = await isUserAllowed(req.params.id, req.user.id);
  if (!isAllowed) {
    return res.status(401).json({ msg: "Unauthorized user" });
  }

  try {
    const entry = await Entry.findById(req.params.entryId);

    return res.status(200).json({ entry });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ msg: "Server error" });
  }
});


router.patch("/:id/entry/:entryId", auth, async (req, res) => {
  const isAllowed = await isUserAllowed(req.params.id, req.user.id);
  if (!isAllowed) {
    return res.status(401).json({ msg: "Unauthorized user" });
  }

  try {
    await Entry.findOneAndUpdate({ id: req.params.entryId }, req.body);

    return res.status(200).json({ msg: "Entry updated successfully" });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ msg: "Server error" });
  }
});

router.delete("/:id/entry/:entryId", auth, async (req, res) => {
  const isAllowed = await isUserAllowed(req.params.id, req.user.id);
  if (!isAllowed) {
    return res.status(401).json({ msg: "Unauthorized user" });
  }

  try {
    await Entry.findOneAndRemove({ id: req.params.entryId });

    return res.status(200).json({ msg: "Entry deleted" });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ msg: "Server error" });
  }
});

module.exports = router;

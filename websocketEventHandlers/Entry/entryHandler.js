const Entry = require("../../models/Entry");
const Storii = require("../../models/Storii");

const postEntry = async (message) => {
  try {
    const entry = new Entry({
      writer: message.writer._id,
      storiiId: "5ec66337ac935260a11e1388",
      content: message.content,
    });

    await entry.save();

    const storii = await Storii.findById("5ec66337ac935260a11e1388");

    storii.entries = [...storii.entries, entry._id];
    await storii.save();
  } catch (err) {
    console.error(err);
    throw new Error("unable to post entry");
  }
};

const entryHandler = { postEntry };

module.exports = entryHandler;

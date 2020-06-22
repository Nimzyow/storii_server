const Entry = require("../../models/Entry");
const Storii = require("../../models/Storii");

const saveEntry = async (storiiID, message) => {
  const entry = new Entry({
    writer: message.writer._id,
    storiiId: storiiID,
    content: message.content,
  });

  await entry.save();

  const storii = await Storii.findById(storiiID);

  storii.entries = [...storii.entries, entry._id];
  await storii.save();
};

const postNewEntry = async (message) => {
  try {
    if (process.env.NODE_ENV === "production") {
      saveEntry("5eec96f102ac44ab161b3b14", message);
    } else {
      saveEntry("5ec66337ac935260a11e1388", message);
    }
  } catch (err) {
    console.error(err);
    throw new Error("unable to post entry");
  }
};

const entryHandler = { postNewEntry };

module.exports = entryHandler;

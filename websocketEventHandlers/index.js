const entryHandler = require("./Entry/entryHandler");

const WebSocketEventHandlers = (emitter) => {
  const events = {
    message: async (message) => {
      try {
        await entryHandler.postNewEntry(message);
        emitter.emit("new-message", message);
      } catch (err) {
        // eslint-disable-next-line no-console
        throw new Error(err.message);
      }
    },
    deleteEntry: async (entryInfo) => {
      try {
        await entryHandler.deleteEntry(entryInfo);
        //emitter.emit("new-message", entryInfo);
      } catch (err) {
        // eslint-disable-next-line no-console
        throw new Error(err.message);
      }
    },
  };
  return events;
};

module.exports = WebSocketEventHandlers;

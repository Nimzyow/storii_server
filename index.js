const app = require("./server");
const db = require("./db");
// const { postNewEntry } = require("./routes/entryHandler");
const WebSocketEventHandlers = require("./websocketEventHandlers/index");

db.connect();

const PORT = process.env.PORT || 4000;

const server = app.listen(PORT, () => {
  // eslint-disable-next-line no-console
  console.log(`Server listening on ${PORT}`);
});

// eslint-disable-next-line import/order
const emitter = require("socket.io")(server);

emitter.on("connection", (socket) => {
  const events = WebSocketEventHandlers(emitter);

  Object.entries(events).forEach((handler) => {
    const eventName = handler[0];
    const eventFunction = handler[1];

    socket.on(eventName, eventFunction);
  });
});

const WebSocketEventHandlers = require("./websocketEventHandlers/index");

const createWebsocket = (server) => {
  // eslint-disable-next-line global-require
  const emitter = require("socket.io")(server);

  emitter.on("connection", (socket) => {
    const events = WebSocketEventHandlers(emitter);

    Object.entries(events).forEach((handler) => {
      const eventName = handler[0];
      const eventFunction = handler[1];

      socket.on(eventName, eventFunction);
    });
  });
};

module.exports = createWebsocket;

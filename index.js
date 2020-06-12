const app = require("./server");
const db = require("./db");
const createWebsocket = require("./websocket");

db.connect();

const PORT = process.env.PORT || 4000;

const server = app.listen(PORT, () => {
  // eslint-disable-next-line no-console
  console.log(`Server listening on ${PORT}`);
});

createWebsocket(server);

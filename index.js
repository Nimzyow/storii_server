const app = require("./server");
const db = require("./db");
const { postNewEntry } = require("./routes/entryHandler");

db.connect();

const PORT = process.env.PORT || 4000;

const server = app.listen(PORT, () => {
  // eslint-disable-next-line no-console
  console.log(`Server listening on ${PORT}`);
});

const io = require("socket.io")(server);
io.on("connection", (socket) => {
  console.log("SOMEONE HAS JOINED connection");

  socket.on("message", async (message) => {
    try {
      await postNewEntry(message);
      io.emit("new-message", message);
    } catch (err) {
      console.error(err);
    }
  });
});

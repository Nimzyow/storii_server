const db = require("../../db");
const app = require("../../server");

const PORT = 4777;
let server;
// Will run after every test in every file
before(async () => {
  await db.connect();
  server = app.listen(PORT);
});

after(async () => {
  server.close();
  db.disconnect();
});

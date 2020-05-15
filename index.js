const app = require("./server");
const db = require("./db");

db.connect();

const PORT = 4000;

app.listen(PORT, () => {
  // eslint-disable-next-line no-console
  console.log(`Server listening on ${PORT}`);
});

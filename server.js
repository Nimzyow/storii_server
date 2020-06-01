const express = require("express");
const cors = require("cors");

// const whitelist = ["http://localhost:8080"];

// const corsOptions = {
//   origin: (origin, callback) => {
//     if (whitelist.indexOf(origin) !== -1) {
//       callback(null, true);
//     } else {
//       callback(new Error("Not allowed by CORS"));
//     }
//   },
// };

const app = express();
// middleware
app.use(express.json({ extended: false }));

// Define Routes
app.use(cors());
app.use("/auth", require("./routes/auth"));
app.use("/users", require("./routes/users"));
app.use("/storii", require("./routes/storiis"));
app.use("/storii", require("./routes/entries"));

module.exports = app;

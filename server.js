const express = require("express");

const app = express();

// middleware
app.use(express.json({ extended: false }));

// Define Routes
app.use("/auth", require("./routes/auth"));
app.use("/users", require("./routes/users"));

module.exports = app;

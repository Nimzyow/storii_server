const express = require("express");

const app = express();

// Define Routes
app.use("/auth", require("./routes/auth"));

module.exports = app;

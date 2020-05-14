const express = require("express");

const connectDB = require("./db");

connectDB();
const app = express();

// Define Routes
app.use("/auth", require("./routes/auth"));

module.exports = app;

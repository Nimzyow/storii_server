const mongoose = require("mongoose");
const config = require("./.config");

const connectDB = async () => {
  try {
    await mongoose.connect(config.db, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useCreateIndex: true,
      useFindAndModify: false,
    });
    // eslint-disable-next-line no-console
    console.log("db connected!");
  } catch (err) {
    // eslint-disable-next-line no-console
    console.error("Could not connect to DB");
    process.exit(1);
  }
};

module.exports = connectDB;

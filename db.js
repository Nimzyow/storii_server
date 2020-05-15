const mongoose = require("mongoose");
const config = require("./.config");

const connectDB = async (uri) => {
  try {
    await mongoose.connect(uri, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useCreateIndex: true,
      useFindAndModify: false,
      connectTimeoutMS: 3000,
    });
  } catch (err) {
    // eslint-disable-next-line no-console
    console.error("Could not connect to DB");
    process.exit(1);
  }
};


const connect = () => {
  if (process.env.NODE_ENV === "test") {
    // eslint-disable-next-line no-console
    console.log("I will test now, you cannot stop me");
    // test
    return connectDB(config.testURI).then(() => {
      // eslint-disable-next-line no-console
      console.log(`Connected to ${process.env.NODE_ENV} db`);
    });
  }
  if (process.env.NODE_ENV === "production") {
    // eslint-disable-next-line no-console
    console.log("I'm a real boy");
    return connectDB(config.productionURI).then(() => {
      // eslint-disable-next-line no-console
      console.log(`Connected to ${process.env.NODE_ENV} db`);
    });
  }
  // eslint-disable-next-line no-console
  console.error(`
   Couldn't connect:

   env: ${process.env.NODE_ENV}
  `);
  return null;
};

const disconnect = () => {
  mongoose.connection.close(() => {
    // eslint-disable-next-line no-console
    console.log(`Disconnected to ${process.env.NODE_ENV} db`);
    process.exit(0);
  });
};

const cleanDatabase = () => mongoose.connection.db.dropDatabase();

const db = {
  connect,
  disconnect,
  cleanDatabase,
};
module.exports = db;

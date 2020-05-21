const mongoose = require("mongoose");

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
    return connectDB(process.env.testURI).then(() => {
      // eslint-disable-next-line no-console
      console.log(`Connected to ${process.env.NODE_ENV} db`);
    });
  }
  if (process.env.NODE_ENV === "development") {
    // eslint-disable-next-line no-console
    console.log("DEVELOPING! DO NOT INTERUPT HOOMAN");
    // test
    return connectDB(process.env.developmentURI).then(() => {
      // eslint-disable-next-line no-console
      console.log(`Connected to ${process.env.NODE_ENV} db`);
    });
  }
  if (process.env.NODE_ENV === "production") {
    // eslint-disable-next-line no-console
    console.log("I'm a real boy");
    return connectDB(process.env.productionURI).then(() => {
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

const cleanDatabase = async () => {
  try {
    await mongoose.connection.db.dropDatabase();
  } catch (err) {
    // ignore error on purpose
  }
  return true;
};

const db = {
  connect,
  disconnect,
  cleanDatabase,
};
module.exports = db;

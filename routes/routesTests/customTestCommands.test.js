const request = require("supertest");

const app = require("../../server");

// @ params: user Obj:
// user = { penName, email, password} STRINGS
//
// return token;
const createNewCustomUser = async (callback, user) => {
  let newUser;
  if (!user) {
    newUser = {
      penName: "defaultTestUser",
      email: "defaultTestUser@test.com",
      password: "defaultTestPassword",
    };
  } else {
    newUser = { ...user };
  }

  request(app)
    .post("/users")
    .send(newUser)
    .set("Content-Type", "application/json")
    .end(async (err, res) => {
      if (err) {
        return res.json({
          msg: err.message,
          from: "customTestCommands: createNewCustomUser",
        });
      }
      callback(res.body.token);
    });
};

module.exports = {
  createNewCustomUser,
};

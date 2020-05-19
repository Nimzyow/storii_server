const request = require("supertest");

const app = require("../../server");
const User = require("../../models/User");
const passwordUtils = require("../passwordUtils");

// @ params: user options:
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

// @ params: token, callback (request function), storii options:
// storii = { owner, title, descrption, mainGenre} STRINGS
//
// return (token, successfully created storii Obj);
const createNewStorii = (token, callback, storii) => {
  let newStorii;
  if (!storii) {
    newStorii = {
      owner: "defaultOwner",
      title: "defaultTitle",
      description: "defaultDescription",
      mainGenre: "defaultGenre",
    };
  } else {
    newStorii = { ...storii };
  }
  request(app)
    .post("/storii")
    .set({
      "Content-Type": "application/json",
      "x-auth-token": token,
    })
    .send(newStorii)
    .end((err, res) => {
      if (err) {
        return res.json({
          msg: err.message,
          from: "customTestCommands: createNewStorii",
        });
      }

      callback(token, res.body);
    });
};

const createDBUser = async (userDetails) => {
  const encryptedPassword = await passwordUtils.encrypt(userDetails.password);

  const userToSave = new User({
    ...userDetails,
    password: encryptedPassword,
  });

  const user = await userToSave.save();
  return user;
};


module.exports = {
  createNewCustomUser,
  createNewStorii,
  createDBUser,
};

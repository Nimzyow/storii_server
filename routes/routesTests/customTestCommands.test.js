const User = require("../../models/User");
const Storii = require("../../models/Storii");
const passwordUtils = require("../passwordUtils");

const createDBUser = async (userDetails) => {
  const userToCreate = userDetails || {
    penName: "defaultTestUser",
    email: "defaultTestUser@test.com",
    password: "defaultTestPassword",
  };
  const encryptedPassword = await passwordUtils.encrypt(userToCreate.password);

  const userToSave = new User({
    ...userToCreate,
    password: encryptedPassword,
  });

  const user = await userToSave.save();
  return user;
};

const createDBStorii = async (userId, storiiDetails) => {
  const storiiToCreate = storiiDetails || {
    title: "defaultTitle",
    description: "defaultDescription",
    mainGenre: "defaultGenre",
  };
  const storiiToSave = new Storii({
    ...storiiToCreate,
    owner: userId,
  });
  const storii = await storiiToSave.save();

  return storii;
};

module.exports = {
  createDBUser,
  createDBStorii,
};

const User = require("../../models/User");
const Storii = require("../../models/Storii");
const passwordUtils = require("../passwordUtils");

const createDBUser = async (userDetails) => {
  const encryptedPassword = await passwordUtils.encrypt(userDetails.password);

  const userToSave = new User({
    ...userDetails,
    password: encryptedPassword,
  });

  const user = await userToSave.save();
  return user;
};

const createDBStorii = async (userId, storiiDetails) => {
  const storiiToSave = new Storii({
    ...storiiDetails,
    owner: userId,
  });
  const storii = await storiiToSave.save();

  return storii;
};

module.exports = {
  createDBUser,
  createDBStorii,
};

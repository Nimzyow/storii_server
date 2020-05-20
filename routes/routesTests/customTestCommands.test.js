const User = require("../../models/User");
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


module.exports = {
  createDBUser,
};

// to handle password encryption

const bcrypt = require("bcrypt");

const encrypt = async (password) => {
  const salt = await bcrypt.genSalt(10);

  return bcrypt.hash(password, salt);
};

const compare = async (password, userPassword) => bcrypt.compare(password, userPassword);

module.exports = {
  encrypt,
  compare,
};

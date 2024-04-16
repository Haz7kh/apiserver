const { v4: uuidv4 } = require("uuid");

const createUser = (username, password) => ({
  id: uuidv4(),
  username,
  password,
});

module.exports = createUser;

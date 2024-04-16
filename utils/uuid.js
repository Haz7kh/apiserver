const { v4: uuidv4 } = require("uuid");

// Generate unique user ID
function generateUserId() {
  return uuidv4();
}

module.exports = generateUserId;

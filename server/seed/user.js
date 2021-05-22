const bcrypt = require("bcrypt");

const users = [
  {
    name: "test",
    email: "test@mail.com",
    hash: bcrypt.hashSync("test@123", 12),
    isAdmin: false,
  },
  {
    name: "admin",
    email: "admin@mail.com",
    hash: bcrypt.hashSync("admin@123", 12),
    isAdmin: true,
  },
];

module.exports = { users };

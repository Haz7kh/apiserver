const express = require("express");
const router = express.Router();
const createUser = require("../models/user");

module.exports = (userDB) => {
  router.post("/register", (req, res) => {
    const { username, password } = req.body;
    const newUser = createUser(username, password);
    userDB.insert(newUser, (err, user) => {
      if (err) {
        res.status(500).json({ error: "Failed to register user" });
      } else {
        res.status(201).json(user);
      }
    });
  });

  return router;
};

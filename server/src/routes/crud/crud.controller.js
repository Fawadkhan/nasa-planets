const { users } = require("../../models/users.model");

const getUser =  (req, res) => {
    // res.send(Array.from(users.values()))
   return res.status(200).json(Array.from(users.values()));
  }

  const getUserById = (req, res) => {
    const userId = req.params.id;
   return res.send(`User ${userId}`);
  }
  module.exports = {
    getUser,
    getUserById
  }
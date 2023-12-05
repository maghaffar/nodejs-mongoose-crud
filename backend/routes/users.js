const express = require("express");
const {
  getUsers,
  getSingleUser,
  createUser,
  updateUser,
  deleteUser,
} = require("../controllers/user");
const user = express.Router();

// Get All Users;
user.get("/", getUsers);

// Get Single User
user.get("/:id", getSingleUser);

// Create User
user.post("/", createUser);

//Update User
user.put("/:id", updateUser);

//Delete User
user.delete("/:id", deleteUser);

module.exports = user;

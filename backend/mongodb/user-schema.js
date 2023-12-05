const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  name: String,
  username: String,
  email: String,
  phone: String,
  website: String,
});

const User = new mongoose.model("users", userSchema);

module.exports = User;

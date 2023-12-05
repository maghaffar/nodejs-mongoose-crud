const { default: mongoose } = require("mongoose");

const MongoClient = (callback) =>
  mongoose
    .connect("mongodb://localhost:27017/users")
    .then(() => {
      return callback();
    })
    .catch((err) => {
      return callback(err);
    });

module.exports = {
  MongoClient,
};

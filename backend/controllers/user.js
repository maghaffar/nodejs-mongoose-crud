const User = require("../mongodb/user-schema");

const getUsers = async (req, res) => {
  const users = await User.find();
  res.status(200).json(users);
};

const getSingleUser = async (req, res) => {
  const user = await User.find({ _id: req.params.id });
  res.status(200).json(user);
};

const createUser = async (req, res) => {
  const user = req.body;

  let isEmailExist = await User.find({ email: user.email });
  let isUserNameExist = await User.find({ username: user.username });

  if (isEmailExist.length !== 0) {
    res.status(400).json({ err: "Email already exists" });
    return;
  } else if (isUserNameExist.length !== 0) {
    res.status(400).json({ err: "Username already exists" });
    return;
  }

  User.create(user)
    .then((user) => {
      res.status(201).json(user);
    })
    .catch((err) => {
      res.status(400).json(err);
    });
};

const updateUser = async (req, res) => {
  const user = req.body;
  let doc = await User.findOneAndUpdate({ _id: req.params.id }, user);
  res.status(200).json({ data: doc });
};

const deleteUser = async (req, res) => {
  const id = req.params.id;
  await User.deleteOne({ _id: id });
  res.status(200).json({ msg: "deleted" });
};

module.exports = {
  getUsers,
  getSingleUser,
  createUser,
  updateUser,
  deleteUser,
};

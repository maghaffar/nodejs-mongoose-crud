const authMiddleware = (req, res, next) => {
  try {
    req.query = { name: "bilal" };
    res.status(400).json("Middleware is not allowing you to enter this app");
    next();
  } catch (error) {}
};

module.exports = {
  authMiddleware,
};

const express = require("express");
const app = express();
const cors = require("cors");
const port = 3001;
const user = require("./routes/users.js");
const { MongoClient } = require("./utils/clients");
app.use(cors("*"));
app.use(express.json());
app.use("/users", user);

MongoClient((err) => {
  if (!err) {
    app.listen(port, () => {
      console.log(`listenig on port ${port}`);
    });
  }
});

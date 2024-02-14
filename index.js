require("dotenv").config();
const express = require("express");
const { connectDB } = require("./src/db/db");
const userRoutes = require("./src/controllers/user.routes");
const app = express();
const cors = require("cors");
const { urlencoded, json } = require("body-parser");
require("dotenv").config();

app.use(cors());
app.use(urlencoded({ extended: true }));
app.use(json());
app.use(express.static("public"));

app.use(userRoutes);
app.get("/", (req, res) => {
  res.sendFile(__dirname + "/views/index.html");
});

connectDB(process.env.MONGO_DB_URL).then((res) => {
  const listener = app.listen(process.env.PORT || 3000, () => {
    console.log("Your app is listening on port " + listener.address().port);
  });
});

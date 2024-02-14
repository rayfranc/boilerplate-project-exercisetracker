const express = require("express");
const UserModel = require("../models/User.model");
const router = express.Router();

router.post("/api/users", async (request, response) => {
  const article = new UserModel(request.body);

  try {
    const { username, _id } = await article.save();
    response.json({ _id, username });
  } catch (error) {
    response.status(500).send(error);
  }
});

router.get("/api/users", async (req, res) => {
  const users = await UserModel.find();
  res.json(
    users.map(({ _id, username }) => {
      return { _id, username };
    })
  );
});

module.exports = router;

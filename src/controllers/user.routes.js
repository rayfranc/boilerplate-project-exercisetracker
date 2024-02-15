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

router.post("/api/users/:id/exercises", async (request, response) => {
  const { description: des, duration: dur, date: dat } = request.body;

  try {
    const user = await UserModel.findById(request.params.id);
    if (!user) {
      return response.status(404).json("No user with that id");
    }
    const dateP = dat
      ? new Date(dat).toUTCString()
      : new Date(Date.now()).toUTCString();
    user.log.push({
      description: des,
      duration: parseInt(dur),
      date: dateP,
    });
    console.log(user);
    await user.save();
    response.json({
      _id: user._id,
      username: user.username,
      description: des,
      duration: parseInt(dur),
      date: dateP,
    });
  } catch (error) {
    console.log(error);
    response.status(500).send(error);
  }
});

module.exports = router;

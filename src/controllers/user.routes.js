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
    user.exercises.push({
      description: des,
      duration: dur,
      date: Date.parse(dat),
    });
    const { username, _id, description, date, duration } = await user.save();
    response.json({ _id, username, description, duration, date });
  } catch (error) {
    response.status(500).send(error);
  }
});

module.exports = router;

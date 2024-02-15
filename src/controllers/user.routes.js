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
      ? new Date(dat).toDateString()
      : new Date(Date.now()).toDateString();
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

router.get("/api/users/:id/logs", async (req, res) => {
  const user = await UserModel.findById(req.params.id);
  if (!user) {
    return res.status(404).json("no user with this id");
  }
  let from = req.query.from ? new Date(req.query.to) : new Date(0);
  let to = req.query.to ? new Date(req.query.to) : new Date();
  let limit = parseInt(req.query.limit);

  log = user.log
    .filter((ex) => new Date(ex.date) >= from && new Date(ex.date) <= to)
    .slice(0, limit || user.log.length);

  return res.json({
    __id: user._id,
    username: user.username,
    count: user.log.length,
    log: log,
  });
});

module.exports = router;

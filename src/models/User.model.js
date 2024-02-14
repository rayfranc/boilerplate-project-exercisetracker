const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
  },
  log: [
    {
      description: { type: String },
      duration: { type: Number },
      date: { type: Date },
    },
  ],
});

const UserModel = mongoose.model("User", UserSchema);
module.exports = UserModel;

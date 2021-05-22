const mongoose = require("mongoose");
const { Schema, model } = mongoose;

const userSchema = new Schema(
  {
    name: String,
    email: { type: String, unique: true },
    hash: String,
    isAdmin: Boolean,
  },
  { timestamps: true }
);

module.exports = model("User", userSchema);

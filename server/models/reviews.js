const mongoose = require("mongoose");
const { Schema, model } = mongoose;

const reviewSchema = new Schema(
  {
    rating: Number,
    comment: String,
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
  },
  { timestamps: true }
);

module.exports = model("Review", reviewSchema);

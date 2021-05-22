const mongoose = require("mongoose");
const { Schema, model } = mongoose;

const Review = require("./reviews");

const catagory = ["posters", "books", "accessories"];

const productSchema = new Schema(
  {
    name: String,
    info: String,
    price: Number,
    qty: Number,
    image: String,
    catagory: {
      type: String,
      enum: [...catagory],
    },
    review: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Review",
      },
    ],
  },
  { timestamps: true }
);

productSchema.post("findOneAndDelete", async (doc) => {
  if (doc) {
    await Review.deleteMany({ _id: { $in: doc.review } });
  }
});

module.exports = model("Product", productSchema);

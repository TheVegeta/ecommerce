const mongoose = require("mongoose");
const mongoUri = process.env.MONGOURI || "mongodb://localhost:27017/ecommerce";

const Product = require("../models/products");
const User = require("../models/user");
const Review = require("../models/reviews");
const Payment = require("../models/payment");

const { products } = require("./product");
const { users } = require("./user");

mongoose
  .connect(mongoUri, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
  })
  .then(() => console.log("connected to mongodb"))
  .catch((err) => console.log(err.message));

const seedDB = async () => {
  await Product.deleteMany({});
  await User.deleteMany({});
  await Review.deleteMany({});
  await Payment.deleteMany({});

  await Product.insertMany(products);
  await User.insertMany(users);
};

seedDB()
  .then(() => mongoose.disconnect())
  .catch((err) => console.log(err.message));

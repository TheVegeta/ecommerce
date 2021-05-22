const jwt = require("jsonwebtoken");
const Product = require("../models/products");
const Review = require("../models/reviews");

const getProducts = async (req, res) => {
  if (req.query.id) {
    try {
      const findProduct = await (
        await Product.findById(req.query.id)
      )
        .populate("review")
        .populate({ path: "review", populate: { path: "user" } })
        .populate("user")
        .execPopulate();

      const review = findProduct.review.map((x) => ({
        _id: x._id,
        comment: x.comment,
        rating: x.rating,
        user: x.user.name,
        email: x.user.email,
      }));

      const upFindProduct = {
        _id: findProduct._id,
        name: findProduct.name,
        image: findProduct.image,
        qty: findProduct.qty,
        price: findProduct.price,
        info: findProduct.info,
        catagory: findProduct.catagory,
        review: [...review],
      };

      return res.json({ success: true, product: upFindProduct });
    } catch {
      return res
        .status(400)
        .json({ success: false, msg: "can't find product" });
    }
  }

  const findProduct = await Product.find({}).sort({ createdAt: "asc" });
  return res.json({ success: true, products: findProduct });
};

const addReview = async (req, res) => {
  const id = req.params.id;
  const { rating, comment } = req.body.payload;

  const { id: user } = jwt.decode(req.headers.authorization);

  try {
    const findProduct = await Product.findById(id);
    const newReview = new Review({ rating, comment, user });
    findProduct.review.push(newReview);
    newReview.save();
    findProduct.save();

    return res.json({ success: true, msg: "review added" });
  } catch (err) {
    console.log(err);
    res.status(400).json({ success: true, msg: "your review exist" });
  }
};

const deleteReview = async (req, res) => {
  const { productId, reviewId } = req.params;
  try {
    await Product.findByIdAndUpdate(productId, { $pull: { review: reviewId } });
    await Review.findByIdAndDelete(reviewId);
    res.json({});
  } catch {
    res.status(400).json({ success: false, msg: "something went wrong" });
  }
};

module.exports = { getProducts, addReview, deleteReview };

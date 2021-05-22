const express = require("express");
const productRoute = express.Router();

const catchAsync = require("../utils/catchAsync");
const { isLoggedIn } = require("../utils/jwt");
const { isReviewAuthor, validateReview } = require("../middleware");

const {
  getProducts,
  addReview,
  deleteReview,
} = require("../controller/product");

productRoute.get("/", catchAsync(getProducts));

productRoute.post(
  "/review/:id",
  isLoggedIn,
  validateReview,
  catchAsync(addReview)
);
productRoute.delete(
  "/review/:productId/:reviewId",
  isLoggedIn,
  isReviewAuthor,
  catchAsync(deleteReview)
);

module.exports = { productRoute };

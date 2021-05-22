const jwt = require("jsonwebtoken");
const Review = require("./models/reviews");
const {
  registerSchema,
  loginSchema,
  paymentSchema,
  paymentItemsSchema,
  reviewSchema,
  productSchema,
  updateProductSchema,
} = require("./schema");

const isReviewAuthor = async (req, res, next) => {
  const reviewId = req.params.reviewId;
  const { id } = jwt.decode(req.headers.authorization);

  const findReview = await (await Review.findById(reviewId))
    .populate("user")
    .execPopulate();

  if (findReview.user._id == id) {
    return next();
  } else {
    return res
      .status(400)
      .json({ success: false, msg: "you are not author of the review" });
  }
};

const validateRegisterSchema = (req, res, next) => {
  const { error } = registerSchema.validate(req.body.payload);
  if (error) {
    return res
      .status(400)
      .json({ success: false, msg: "review schema validation error" });
  }
  next();
};

const validateLoginSchema = (req, res, next) => {
  const { error } = loginSchema.validate(req.body.payload);
  if (error) {
    return res
      .status(400)
      .json({ success: false, msg: "review schema validation error" });
  }
  next();
};

const validatePaymentSchema = (req, res, next) => {
  console.log("ooo");

  const { error: paymentError } = paymentSchema.validate(
    req.body.payload.token
  );

  const { error: paymentItemsError } = paymentItemsSchema.validate(
    req.body.payload.items
  );
  console.log("dsad", paymentItemsError, "dsad", paymentError);

  if (paymentError === undefined && paymentItemsError === undefined) {
    return next();
  }

  return res
    .status(400)
    .json({ success: false, msg: "schema validation error" });
};

const validateReview = (req, res, next) => {
  const { error } = reviewSchema.validate(req.body.payload);

  if (error) {
    return res
      .status(400)
      .json({ success: false, msg: "review schema validation error" });
  }

  next();
};

const validateProductSchema = (req, res, next) => {
  const { error } = productSchema.validate(req.body);

  if (error) {
    return res
      .status(400)
      .json({ success: false, msg: "review schema validation error" });
  }
  next();
};

const validateUpdateProductSchema = (req, res, next) => {
  const { error } = updateProductSchema.validate(req.body.payload);
  if (error) {
    return res
      .status(400)
      .json({ success: false, msg: "review schema validation error" });
  }
  next();
};

module.exports = {
  isReviewAuthor,
  validateRegisterSchema,
  validateLoginSchema,
  validatePaymentSchema,
  validateReview,
  validateProductSchema,
  validateUpdateProductSchema,
};

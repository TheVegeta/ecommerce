const express = require("express");
const adminRoutes = express.Router();

const multer = require("multer");
const upload = multer({ dest: "uploads/" });

const catchAsync = require("../utils/catchAsync");
const {
  getPayments,
  updatePayment,
  getProducts,
  updateProducts,
  addProduct,
  deleteProduct,
} = require("../controller/admin");
const {
  validateProductSchema,
  validateUpdateProductSchema,
} = require("../middleware");

adminRoutes
  .route("/payments")
  .get(catchAsync(getPayments))
  .post(catchAsync(updatePayment));

adminRoutes
  .route("/products")
  .get(catchAsync(getProducts))
  .post(upload.single("image"), validateProductSchema, catchAsync(addProduct))
  .delete(catchAsync(deleteProduct));

adminRoutes.post(
  "/products/update",
  validateUpdateProductSchema,
  catchAsync(updateProducts)
);

module.exports = { adminRoutes };

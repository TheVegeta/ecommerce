const express = require("express");
const paymentRoute = express.Router();

const catchAsync = require("../utils/catchAsync");
const { isLoggedIn } = require("../utils/jwt");
const { getPayments, savePayments } = require("../controller/payments");
const { validatePaymentSchema } = require("../middleware");

paymentRoute.get("/", isLoggedIn, catchAsync(getPayments));
paymentRoute.post(
  "/",
  isLoggedIn,
  validatePaymentSchema,
  catchAsync(savePayments)
);

module.exports = { paymentRoute };

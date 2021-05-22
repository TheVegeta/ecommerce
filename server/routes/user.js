const express = require("express");
const userRoute = express.Router();

const catchAsync = require("../utils/catchAsync");
const { registerController, loginController } = require("../controller/user");
const {
  validateRegisterSchema,
  validateLoginSchema,
} = require("../middleware");

userRoute.post(
  "/register",
  validateRegisterSchema,
  catchAsync(registerController)
);
userRoute.post("/login", validateLoginSchema, catchAsync(loginController));

module.exports = { userRoute };

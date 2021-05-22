const joi = require("joi");

const registerSchema = joi.object({
  name: joi.string().min(3).max(15).required(),
  email: joi.string().email().required(),
  password: joi.string().min(6).max(12).required(),
});

const loginSchema = joi.object({
  email: joi.string().email().required(),
  password: joi.string().min(6).max(12).required(),
});

const paymentSchema = joi.object({
  id: joi.string().required(),
  object: joi.string().required(),
  client_ip: joi.string().required(),
  created: joi.number().required(),
  email: joi.string().email().required(),
  livemode: joi.boolean().required(),
  type: joi.string().required(),
  used: joi.boolean().required(),
  card: joi.object({
    id: joi.string().required(),
    object: joi.string().required(),
    address_city: joi.string().required(),
    address_country: joi.string().required(),
    address_line1: joi.string().required(),
    address_line1_check: joi.string().required(),
    address_line2: joi.string().allow(null),
    address_state: joi.string().allow(null),
    address_zip: joi.string().required(),
    address_zip_check: joi.string().required(),
    brand: joi.string().required(),
    country: joi.string().required(),
    cvc_check: joi.string().required(),
    dynamic_last4: joi.string().allow(null),
    exp_month: joi.number().required(),
    exp_year: joi.number().required(),
    funding: joi.string().required(),
    last4: joi.string().required(),
    name: joi.string().required(),
    tokenization_method: joi.string().allow(null),
  }),
});

const cartItems = joi.object({
  _id: joi.string().required(),
  name: joi.string().required(),
  image: joi.string().required(),
  price: joi.number().min(10).required(),
  cartQty: joi.number().min(1).required(),
  qty: joi.number().required(),
});

const paymentItemsSchema = joi.array().items(cartItems);

const reviewSchema = joi.object({
  rating: joi.number().min(1).max(5).required(),
  comment: joi.string().min(10).max(150).required(),
});

const productSchema = joi.object({
  name: joi.string().min(5).required(),
  info: joi.string().min(10).required(),
  price: joi.number().min(1).required(),
  qty: joi.number().min(4).required(),
  catagory: joi.string().required(),
});

const updateProductSchema = joi.object({
  id: joi.string().required(),
  name: joi.string().min(5).required(),
  info: joi.string().min(10).required(),
  price: joi.number().min(1).required(),
  qty: joi.number().min(4).required(),
  catagory: joi.string().required(),
  image: joi.string().uri().required(),
});

module.exports = {
  registerSchema,
  loginSchema,
  paymentSchema,
  paymentItemsSchema,
  reviewSchema,
  productSchema,
  updateProductSchema,
};

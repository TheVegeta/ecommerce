const axios = require("axios").default;
const fs = require("fs");
const FormData = require("form-data");

const Product = require("../models/products");
const Payment = require("../models/payment");

const getPayments = async (req, res) => {
  const findPayment = await Payment.find({});
  res.json({ success: true, payments: findPayment });
};

const updatePayment = async (req, res) => {
  const id = req.query.id;
  await Payment.findByIdAndUpdate(id, { isDeliverd: true }).then(() =>
    res.json({ success: true, msg: "updated successfully" })
  );
};

const getProducts = async (req, res) => {
  const findProducts = await Product.find({});
  return res.json({ success: true, products: findProducts });
};

const updateProducts = async (req, res) => {
  const { id, name, info, price, qty, catagory, image } = req.body.payload;

  await Product.findByIdAndUpdate(id, {
    name,
    info,
    price,
    qty,
    catagory,
    image,
  })
    .then(() => res.json({ success: true, msg: "updated successfully" }))
    .catch(() =>
      res.status(400).json({ success: false, msg: "problem updating products" })
    );
};

const addProduct = async (req, response) => {
  const { name, info, price, qty, catagory } = req.body;
  if (req.file.mimetype === "image/jpeg" || req.file.mimetype === "image/png") {
    const image = await fs.readFileSync(req.file.path, {
      encoding: "base64",
    });
    const data = new FormData();
    data.append("key", process.env.REACT_APP_IMGBB);
    data.append("image", image);
    data.getHeaders();
    await axios({
      method: "POST",
      url: "https://api.imgbb.com/1/upload",
      headers: data.getHeaders(),
      data: data,
    })
      .then(async (res) => {
        const newProduct = await new Product({
          name,
          info,
          price,
          qty,
          catagory,
          image: res.data.data.medium.url,
        });

        newProduct
          .save()
          .then(() => {
            response.json({
              success: true,
              msg: "product created successfully",
            });
          })
          .catch(() => {
            response
              .status(400)
              .json({ success: false, msg: "error creating product" });
          });
      })
      .catch(() =>
        response
          .status(400)
          .json({ success: false, msg: "error creating product" })
      );
  } else {
    response
      .status(400)
      .json({ success: false, msg: "please add valid file type" });
  }
};

const deleteProduct = async (req, res) => {
  const id = req.query.id;
  await Product.findByIdAndDelete(id);
  return res.json({ success: false, msg: "deleted successfully" });
};

module.exports = {
  getPayments,
  updatePayment,
  getProducts,
  updateProducts,
  addProduct,
  deleteProduct,
};

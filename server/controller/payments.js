const stripe = require("stripe")(process.env.STRIPT_SECRET_KEY);

const jwt = require("jsonwebtoken");
const Payment = require("../models/payment");

const getPayments = async (req, res) => {
  const { id } = jwt.decode(req.headers.authorization);
  const findPayment = await Payment.find({ userId: id });
  return res.json({ success: true, paymentInfo: findPayment });
};

const savePayments = async (req, res) => {
  const { token, items: cart } = req.body.payload;
  const { id } = token;

  const { id: userId } = jwt.decode(req.headers.authorization);

  const items = cart.map((x) => ({
    name: x.name,
    cartQty: x.cartQty,
    image: x.image,
    price: x.price,
    product: x._id,
  }));

  const amount =
    cart.reduce((total, val) => total + val.price * val.cartQty, 0).toFixed(2) *
    100;

  try {
    await stripe.paymentIntents.create({
      amount: amount.toFixed(0),
      currency: "INR",
      description: "Your Company Description",
      payment_method_data: {
        type: "card",
        card: { token: id },
      },
      confirm: true,
    });

    const newPayment = new Payment({
      ...token,
      userId,
      items,
      amount: amount / 100,
      isDeliverd: false,
    });
    await newPayment
      .save()
      .then(() => res.json({ success: true, msg: "Payment Successful" }));
  } catch (err) {
    console.log(err);

    res.status(400).json({
      message: "Payment Failed",
      success: false,
    });
  }
};

module.exports = { getPayments, savePayments };

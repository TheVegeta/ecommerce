const mongoose = require("mongoose");
const { Schema, model } = mongoose;

const paymentSchema = new Schema(
  {
    items: [
      {
        name: { type: String, required: true },
        cartQty: { type: Number, required: true },
        image: { type: String, required: true },
        price: { type: Number, required: true },
        product: {
          type: mongoose.Schema.Types.ObjectId,
          required: true,
          ref: "Product",
        },
      },
    ],
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "User",
    },
    id: {
      type: String,
      required: true,
    },
    object: {
      type: String,
      required: true,
    },
    card: {
      id: {
        type: String,
        required: true,
      },
      object: {
        type: String,
        required: true,
      },
      address_city: {
        type: String,
        required: true,
      },
      address_country: {
        type: String,
        required: true,
      },
      address_line1: {
        type: String,
        required: true,
      },
      address_line1_check: {
        type: String,
        required: true,
      },
      address_line2: {
        type: String,
      },
      address_state: {
        type: String,
      },
      address_zip: {
        type: String,
        required: true,
      },
      address_zip_check: {
        type: String,
      },
      brand: {
        type: String,
        required: true,
      },
      country: {
        type: String,
        required: true,
      },
      cvc_check: {
        type: String,
        required: true,
      },
      dynamic_last4: {
        type: String,
      },
      exp_month: {
        type: Number,
        required: true,
      },
      exp_year: {
        type: Number,
        required: true,
      },
      funding: {
        type: String,
      },
      last4: {
        type: String,
      },
      name: {
        type: String,
      },
      tokenization_method: {
        type: String,
      },
    },
    client_ip: {
      type: String,
      required: true,
    },
    created: {
      type: Number,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    livemode: {
      type: Boolean,
      required: true,
    },
    type: {
      type: String,
      required: true,
    },
    used: {
      type: Boolean,
      required: true,
    },
    amount: {
      type: Number,
      required: true,
    },
    isDeliverd: {
      type: Boolean,
      required: true,
    },
  },
  { timestamps: true }
);

module.exports = model("Payment", paymentSchema);

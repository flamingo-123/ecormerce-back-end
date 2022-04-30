const mongoose = require("mongoose");
const baseModle = require("./base-model");
const CartSchema = new mongoose.Schema(
  {
    ...baseModle,
    userId: { type: String, required: true },
    products: [
      {
        productId: {
          type: String,
        },
        quantity: {
          type: Number,
          default: 1,
        },
      },
    ],
  },
  { timestamps: true }
);
module.exports = CartSchema
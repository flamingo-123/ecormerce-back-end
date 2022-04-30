const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const baseModle = require("./base-model");
const OrderSchema = new mongoose.Schema(
  {  
    ...baseModle,
    userId:[{
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    }],
    productId: [
      {
        type: Schema.Types.ObjectId,
        ref: "Product",
        required: true,
      },
    ],
    amount: { type: Number, required: true },
    // address: { type: Object, required: true },
    status: { type: String, default: "pending" },
  },
  { timestamps: true }
);

module.exports = OrderSchema 
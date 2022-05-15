const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const OrderSchema = new mongoose.Schema(
  { 
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
    status: { type: String, default: "pending" },
    payed:  { type:Boolean,default:false}
  },
  { timestamps: true }
);

module.exports = OrderSchema 
const mongoose = require("mongoose");
const baseModel = require("./base-model");
const Schema = mongoose.Schema;
const ProductSchema = new mongoose.Schema(
  {
    ...baseModel,
    userId:[{
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    }],
    title: { type: String, },
    desc: { type: String, },
    img: { type: String,},
    categories: { type: Array },
    size: { type: String },
    color: { type: String },
    price: { type: Number},
  },
  { timestamps: true }
);


module.exports = ProductSchema 
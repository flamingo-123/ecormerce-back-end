const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const ProductSchema = new mongoose.Schema(
  {
    userId:[{
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    }],
    title: { type: String, },
    desc: { type: String, },
    img: { type: String,},
    categories: {type: String },
    size: {type: String },
    color: {type: String },
    price: {type: Number},
    status:{ type: Number,default:0},
    condition:{ type: Number,default:0}
  },
   { timestamps: true }
);


module.exports = ProductSchema 
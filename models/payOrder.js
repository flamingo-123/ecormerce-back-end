const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const payOrderSchema = new mongoose.Schema(
  {  
    userId:[{
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    }],
    products:{ type: Array, required: true },
    payed:{type:Boolean,default:false},
  },
    { timestamps: true }
);
module.exports = payOrderSchema
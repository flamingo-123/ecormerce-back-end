const mongoose = require("mongoose");
const collectSchema = new mongoose.Schema(
  {
    userId:{
      type: String,
      required: true,
    },
    collects:{ type: Array, required: true },
  },
   { timestamps: true }
);
module.exports = collectSchema
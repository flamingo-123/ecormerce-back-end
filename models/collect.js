const mongoose = require("mongoose");
const Schema = mongoose.Schema;
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
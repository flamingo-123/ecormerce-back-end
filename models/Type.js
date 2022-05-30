const mongoose = require("mongoose");
const TypeSchema = new mongoose.Schema(
  {
    title:{
        type: String,
        required: true,
      },
    Types:{ type: Array, required: true },
  },
   { timestamps: true }
);
module.exports = TypeSchema
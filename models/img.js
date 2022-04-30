const mongoose = require("mongoose");
const baseModle = require("./base-model");

const Schema = mongoose.Schema;
const uploadImg = new mongoose.Schema({
  ...baseModle,
  image: {
    type: String,
    default: null
  },
  imageUrl: {
    type: Schema.Types.ObjectId,
    ref: "User",
    required: true,
  }
});

module.exports = uploadImg;
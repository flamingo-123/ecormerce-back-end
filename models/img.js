const mongoose = require("mongoose");
const baseModle = require("./base-model");

const Schema = mongoose.Schema;
const uploadImg = new mongoose.Schema({
  ...baseModle,
  title: {
    type: String,
  },
  imageUrl: {
    type: String,
  }
});

module.exports = uploadImg;
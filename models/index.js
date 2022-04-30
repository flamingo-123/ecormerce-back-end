const mongoose = require("mongoose");
module.exports = {
  User: mongoose.model('User', require('./User')),
  Order: mongoose.model('Order', require('./Order')),
  Cart:mongoose.model('Cart',require("./Cart")),
  Product:mongoose.model("Product",require("./Product")),
  // uploadImg:mongoose.model("uploadImg",require("./uploadImg"))
}
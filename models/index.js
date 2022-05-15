const mongoose = require("mongoose");
module.exports = {
  User: mongoose.model('User', require('./User')),
  Order: mongoose.model('Order', require('./Order')),
  Product:mongoose.model("Product",require("./Product")),
  payOrder:mongoose.model("payOrder",require("./payOrder")),
  Collect:mongoose.model("Collect",require("./collect"))
}
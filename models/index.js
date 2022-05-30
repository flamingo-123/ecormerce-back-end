const mongoose = require("mongoose");
module.exports = {
  User: mongoose.model('User', require('./User')),
  Order: mongoose.model('Order', require('./Order')),
  Product:mongoose.model("Product",require("./Product")),
  payOrder:mongoose.model("payOrder",require("./payOrder")),
  Type:mongoose.model("type",require("./Type")),
  Collect:mongoose.model("Collect",require("./collect")),
  Chat:mongoose.model("Chat",require("./chat")),
  Image:mongoose.model("Image",require("./img")),
 
}
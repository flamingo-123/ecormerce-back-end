const express = require("express");
const router = express.Router();
// 路由聚合
//用户接口
router.use(require("./user"));
//订单接口
router.use("/order",require("./order"))
//产品接口
router.use("/product",require("./product"))
//管理员接口
router.use("/admin",require("./Admin"))
//付款接口
router.use("/payment",require("./payment"))
//收藏接口
router.use("/collect",require("./collect"))
//分类接口
router.use("/type",require("./Type"))
// 数据接口
router.use("/data",require("./data"))
module.exports = router;
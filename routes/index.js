const express = require("express");
const router = express.Router();
// 用户相关路由
router.use(require("./user"));
router.use("/order",require("./order"))
router.use("/product",require("./product"))
router.use("/admin",require("./Admin"))
router.use("/payment",require("./payment"))
router.use("/collect",require("./collect"))
module.exports = router;
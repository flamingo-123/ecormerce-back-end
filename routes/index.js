const express = require("express");
const router = express.Router();
// 用户相关路由
router.use(require("./user"));
router.use("/order",require("./order"))
router.use("/product",require("./product"))
router.use("/cart",require("./cart"))
router.use("/admin",require("./Admin"))
// router.use("/search",require("./search"))
module.exports = router;
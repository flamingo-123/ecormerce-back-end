const express = require("express");
const advancedResults = require('../middleware/advancedResults')
const router = express.Router({ mergeParams: true })
const { protect, authorize } = require('../middleware/auth')
const {
  createOrder,
  DeleteOrder,
  income,
  getUserOrders,
  updateOrder
} = require('../controllers/order')

const {Order} = require('../models')

router
  .route("/")
  .post(createOrder)

  router
  .route("/get")
  .get(getUserOrders)


router
  .route("/:id")
  .delete(DeleteOrder)


router
  .route("/income")
  .get(income)


router
.route("/cleared")
.put(updateOrder)


module.exports = router;

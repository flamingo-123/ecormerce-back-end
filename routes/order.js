const express = require("express");
const advancedResults = require('../middleware/advancedResults')
const router = express.Router({ mergeParams: true })
const { protect, authorize } = require('../middleware/auth')
const {
  createOrder,
  DeleteOrder,
  income,
  getUserOrders,
  updateOrder,
  getOrder
} = require('../controllers/order')



router
  .route("/")
  .post(createOrder)

  router
  .route("/get")
  .get(getUserOrders)

  router
  .route("/getOrder")
  .post(getOrder)



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

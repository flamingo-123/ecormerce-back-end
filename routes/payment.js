const express = require("express");
const router = express.Router({ mergeParams: true })
const {
 payment,
 queryOrder,
 payOrder ,

} = require('../controllers/pay')


router
  .route("/")
  .post(payment)

router
  .route("/queryOrder")
  .post(queryOrder)

  router
  .route("/payOrder")
  .post(payOrder)



module.exports = router;

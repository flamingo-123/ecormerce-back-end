const express = require("express");
const advancedResults = require('../middleware/advancedResults')
const router = express.Router({ mergeParams: true })
const { protect, authorize } = require('../middleware/auth')
const {
  createCart,
  updateCart,
  deleteCart,
  getUserCart,
  getAllCart
} = require('../controllers/cart')

router
    .route("/")
    .post(createCart)

router
    .route("/:id")
    .put(updateCart)

router
    .route("/:id")
    .delete(deleteCart)

router
    .route("/findAllProduct")
    .get(getAllCart)

router
    .route("/:id")
    .get(getUserCart)

module.exports = router;

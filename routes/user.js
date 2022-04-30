const express = require("express");
const advancedResults = require('../middleware/advancedResults')
const userValidator = require("../validator/user");
const router = express.Router({ mergeParams: true })
const { protect, authorize } = require('../middleware/auth')
const {
  getUsers,
  getUser,
  updateUser,
  deleteUser,
  register,
  login,
  updatePassword,
  forgotPassword,
  resetPassword
} = require('../controllers/user')
const {User} = require('../models')
router
  .route("/")
  .get(advancedResults(User),getUsers)
  
router
 .route("/register")
 .post(userValidator.register,register)

 router
 .route("/login")
 .post(userValidator.login,login)

 router
 .route("/updatePassword")
 .put(protect,userValidator.updatePassword,updatePassword)

 router
  .route("/forgotPassword")
  .post(protect,forgotPassword)


router
  .route("/:id")
  .get(protect,getUser)
  .put(protect,updateUser)
  .delete(protect,authorize('admin'),deleteUser)
// 设为管理员
router
  .route("/resetPassword/:id")
  .put(resetPassword)

module.exports = router;

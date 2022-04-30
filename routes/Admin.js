
const express = require("express");
const advancedResults = require('../middleware/advancedResults')
const router = express.Router({ mergeParams: true })
const { protect, authorize } = require('../middleware/auth')
const {
  getAdmin,
  setAdmin,
  deleteAdmin,
} = require('../controllers/Admin')
router
  .route("/:id")
  .get(protect,getAdmin)
  .put(authorize('superAdmin'),setAdmin)
  .delete(protect,authorize('superAdmin'),deleteAdmin)

module.exports = router;

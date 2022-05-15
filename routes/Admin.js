
const express = require("express");
const advancedResults = require('../middleware/advancedResults')
const router = express.Router({ mergeParams: true })
const { protect, authorize } = require('../middleware/auth')
const {
  getAdmin,
  cancelAdmin,
  setAdmin,
  createAdmin,
  updateAdmin
} = require('../controllers/Admin')
const {User} = require('../models')



router
  .route("/getAllAdmin")
  .get(advancedResults(User),getAdmin)

router
  .route("/:id")
  .put(protect, authorize('superAdmin'), setAdmin)

router
  .route("/cancelAdmin/:id")
  .put(protect, authorize('superAdmin'), cancelAdmin)


router
  .route("/")
  .get(advancedResults(User),getAdmin)
  .post(protect,authorize('superAdmin'),createAdmin)

  router
  .route("/updateAdmin/:id")
  .put(protect, authorize('superAdmin'),updateAdmin)

module.exports = router;

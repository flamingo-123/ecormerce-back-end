const express = require("express");
const advancedResults = require('../middleware/advancedResults')
const router = express.Router({ mergeParams: true })
const {
  createType,
  DeleteType,
  getType
 
} = require('../controllers/type')

router
  .route("/")
  .post(createType)

router
  .route("/getType")
  .post(getType)

router
  .route("/DeleteType")
  .post(DeleteType)




module.exports = router;

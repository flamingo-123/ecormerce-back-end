const express = require("express");
const advancedResults = require('../middleware/advancedResults')
const router = express.Router({ mergeParams: true })
const {
    getData
} = require('../controllers/data')


router
    .route("/getData")
    .get(getData)
  
module.exports = router;

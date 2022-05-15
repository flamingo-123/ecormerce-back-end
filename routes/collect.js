const express = require("express");
const advancedResults = require('../middleware/advancedResults')
const router = express.Router({ mergeParams: true })
const {
    addCollect,
    getCollect,
    clearCollects,
    clearCollect
} = require('../controllers/collect')
const {Collect} = require('../models')

router
    .route("/")
    .post(addCollect)
  
    router
    .route("/get")
    .get(getCollect)

    router
    .route("/clearCollects")
    .put(clearCollects)

    router
    .route("/clearCollect")
    .put(clearCollect)


module.exports = router;

const express = require("express");
const multer  = require('multer')
const advancedResults = require('../middleware/advancedResults')
const router = express.Router({ mergeParams: true })
const { protect, authorize } = require('../middleware/auth')
const path=require('path')
const {
    createProduct,
    updateProduct,
    deleteProduct,
    getUserProduct,
    getAllProduct
} = require('../controllers/product');
const {Product} = require('../models')
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, path.join(process.cwd(),'uploads'))
    },
    filename: function (req, file, cb) {
      const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
      req.filename=file.fieldname + '-' + uniqueSuffix+`.${file.mimetype.split('/')[1]}`
      cb(null, file.fieldname + '-' + uniqueSuffix+`.${file.mimetype.split('/')[1]}`)

    }
  })
const upload = multer({ storage: storage })

router
    .route("/")
    .post(upload.array("files"),createProduct)

router
    .route("/:id")
    .put(updateProduct)

router
    .route("/:id")
    .delete(deleteProduct)

router
    .route("/findAllProduct")
    .get(advancedResults(Product),getAllProduct)

router
    .route("/getUserProduct")
    .get(advancedResults(Product),getUserProduct)



module.exports = router;

const express = require("express");
const multer = require('multer')
const advancedResults = require('../middleware/advancedResults')
const router = express.Router({ mergeParams: true })
const { protect, authorize } = require('../middleware/auth')
const path = require('path')
const { Product } = require('../models')
const {
    createProduct,
    updateProduct,
    deleteProduct,
    getUserProduct,
    getAllProduct,
    getSpecialProduct,
    getPriceProduct,
    getProductPrice,
    SearchProduct,
    SearchTitle,
    newProduct
} = require('../controllers/product');
const {
    createImage,
    DeleteImage,
    getImage,
} = require('../controllers/Image');

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, path.join(process.cwd(), 'uploads'))
    },
    filename: function (req, file, cb) {
        console.log(file)
        if (file.mimetype.split('/')[0] == "image") {
            const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
            req.imageName = file.fieldname + '-' + uniqueSuffix + `.${file.mimetype.split('/')[1]}`
            cb(null, file.fieldname + '-' + uniqueSuffix + `.${file.mimetype.split('/')[1]}`)
        } else {
            if (file.mimetype.split('/')[0] == "video") {
                const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
                req.videoName = file.fieldname + '-' + uniqueSuffix + `.${file.mimetype.split('/')[1]}`
                cb(null, file.fieldname + '-' + uniqueSuffix + `.${file.mimetype.split('/')[1]}`)
            } else {
                req.videoName = unknown
            }
        }

    }

})
const upload = multer({ storage: storage })
router
    .route("/")
    .post(upload.array("files", 2), createProduct)

router
    .route("/:id")
    .put(updateProduct)


router
    .route("/:id")
    .delete(deleteProduct)

router
    .route("/findAllProduct")
    .post(getAllProduct)


router
    .route("/getSpecialProduct")
    .get(advancedResults(Product), getSpecialProduct)

router
    .route("/getProductPrice")
    .get(getProductPrice)

router
    .route("/getPriceProduct")
    .post(getPriceProduct)

router
    .route("/SearchProduct/:id")
    .get(SearchProduct)


router
    .route("/SearchTitle")
    .get(SearchTitle)


router
    .route("/getUserProduct")
    .get(getUserProduct)

router
    .route("/newProduct")
    .post(newProduct)

    router
    .route("/image")
    .post(upload.array("files", 1), createImage)

router
    .route("/getImage")
    .post(getImage)

router
    .route("/DeleteImage")
    .post(DeleteImage)

module.exports = router;

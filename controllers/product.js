const { Product } = require("../models");
const asyncHandler = require('../middleware/async')
// 创建产品
exports.createProduct = asyncHandler(async (req, res, next) => {
    try {
        const newProduct = new Product(req.body);
        const imagePath = 'http://localhost:3002/uploads/' + req.filename
        newProduct.img=imagePath
        const savedProduct = await newProduct.save();
        res.status(200).json(savedProduct);
    } catch (err) {
        res.status(500).json(err);
    }
})
// 更新产品
exports.updateProduct = asyncHandler(async (req, res, next) => {
    const newProduct = new Product(req.body);
    try {
        const updatedProduct = await Product.findByIdAndUpdate(
            req.params.id,
            {
                $set: req.body,
            },
            { new: true }
        );
        res.status(200).json(updatedProduct);
    } catch (err) {
        res.status(500).json(err);
    }
})
//删除产品
exports.deleteProduct = asyncHandler(async (req, res, next) => {
    try {
        console.log(req.params.id)
        await Product.findByIdAndDelete(req.params.id);
        res.status(200).json("Product has been deleted...");
    } catch (err) {
        res.status(500).json(err);
    }
})

// 获得商品
exports.getUserProduct = asyncHandler(async (req, res, next) => {
    try {
        res.status(200).json(res.advancedResults)
    } catch (err) {
        res.status(500).json(err);
    }
})
// 获得全部商品
exports.getAllProduct = asyncHandler(async (req, res, next) => {
    // const qNew = req.query.new;
    // const qCategory = req.query.category;
    try {
        // let products;
        // if (qNew) {
        //     products = await Product.find().sort({ createdAt: -1 }).limit(1);
        // } else if (qCategory) {
        //     products = await Product.find({
        //         categories: {
        //             $in: [qCategory],
        //         },
        //     });
        // } else {
        //     products = await Product.find();
        // }
        res.status(200).json(res.advancedResults)
    } catch (err) {
        res.status(500).json(err);
    }

})
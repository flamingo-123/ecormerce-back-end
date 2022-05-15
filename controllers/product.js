const { Product } = require("../models");
const asyncHandler = require('../middleware/async')
// 创建产品
exports.createProduct = asyncHandler(async (req, res, next) => {
    try {
        const newProduct = new Product(req.body);
        const imagePath = 'http://localhost:3002/uploads/' + req.filename
        newProduct.img = imagePath
        const savedProduct = await newProduct.save();
        res.status(200).json(savedProduct);
    } catch (err) {
        res.status(500).json(err);
    }
})
// 更新产品
exports.updateProduct = asyncHandler(async (req, res, next) => {
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
    try {
        res.status(200).json(res.advancedResults)
    } catch (err) {
        res.status(500).json(err);
    }
})


// 获取特定商品
exports.getSpecialProduct = asyncHandler(async (req, res, next) => {
    try {
        res.status(200).json(res.advancedResults)
    } catch (err) {
        res.status(500).json(err);
    }


})
// 查询商品的价格
exports.getProductPrice = asyncHandler(async (req, res, next) => {
    try {
        const {categories,status,condition}=req.query
        console.log(categories)
        const Min = await Product.find({ "categories": categories}).sort({ price: -1 }).limit(1)
        const Max = await Product.find({ "categories": categories}).sort({ price: 1 }).limit(1)
         min=Min[0].price
         max=Max[0].price
         res.status(200).json([
            min,
            max
        ]);
    } catch (err) {
        console.log(err)
        res.status(500).json(err);
    }
})

// 查询符合价格的商品
exports.getPriceProduct = asyncHandler(async (req, res, next) => {
    try {
        const {categories,status,condition}=req.query
        console.log(categories)
        const Min = await Product.find({ "categories": categories}).sort({ price: -1 }).limit(1)
        const Max = await Product.find({ "categories": categories}).sort({ price: 1 }).limit(1)
         min=Min[0].price
         max=Max[0].price
         res.status(200).json([
            min,
            max
        ]);
    } catch (err) {
        console.log(err)
        res.status(500).json(err);
    }
})
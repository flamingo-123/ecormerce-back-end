const { Image } = require("../models");
const asyncHandler = require('../middleware/async')
// 轮播图
exports.createImage = asyncHandler(async (req, res, next) => {
    try {
        const newProduct = new Image(req.body);
        const imagePath = 'http://localhost:3002/uploads/' + req.imageName
        newProduct.imageUrl = imagePath
        const savedProduct = await newProduct.save();
        res.status(200).json(savedProduct);
    } catch (err) {
        res.status(500).json(err);
    }
})

//获得轮播图
exports.getImage=asyncHandler(async (req, res, next) => {
    try {
        const {limit,page}=req.body
        const offset=(page-1)*limit
        const image=await Image.find({})
        var   images=await Image.find({})
        .limit(limit)
        .skip(offset)
        .sort({ "createdAt": -1 })
        .lean()
        images.forEach((element, index) => {
            element.id=index+1
        })
        const total = image.length
        const pageCount = Math.ceil(total / limit)
        res.status(200).json({
            images,pageCount 
        });

    } catch (err) {
        console.log(err)
        res.status(500).json(err);
    }
})

//获得轮播图
exports.DeleteImage=asyncHandler(async (req, res, next) => {
    try {
       
        let images = await Image.findOneAndDelete({
            "imageUrl":req.body.imageUrl
        })
        res.status(200).json(images);
    } catch (err) {
        console.log(err)
        res.status(500).json(err);
    }
})


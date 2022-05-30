const { Product, User } = require("../models");
const asyncHandler = require('../middleware/async')
// 创建产品
exports.createProduct = asyncHandler(async (req, res, next) => {
    try {
        const newProduct = new Product(req.body);
        const imagePath = 'http://localhost:3002/uploads/' + req.imageName
        const videoPath = 'http://localhost:3002/uploads/' + req.videoName
        newProduct.img = imagePath
        newProduct.video = videoPath
        const savedProduct = await newProduct.save();
        res.status(200).json(savedProduct);
    } catch (err) {
        res.status(500).json(err);
    }
})
// 更新产品
exports.updateProduct = asyncHandler(async (req, res, next) => {
    try {
        console.log(req.body)
        const updatedProduct = await Product.findByIdAndUpdate(
            req.params.id,
            {
            $set: req.body.data,
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
        res.status(200).json("产品已经删除");
    } catch (err) {
        res.status(500).json(err);
    }
})

// 获得商品
exports.getUserProduct = asyncHandler(async (req, res, next) => {
    try {
        const { limit,page,status,condition} = req.query
        console.log(req.query)
        const offset = (page - 1) * limit
        let userOpts = [{
            path: 'userId',
            select: ['username', 'schoolName'],
        }]
        filter = {
            
        }
        if (status) {
            filter.status=status 
        }
        if(condition){
            filter.condition=condition
        }
        if (req.query.userId) {
         filter.userId=req.query.userId
        }
        if(req.query.delete!=null){
          filter.delete=req.query.delete
        }
       
        const total = await Product.find(filter).count();
        const Count= Math.ceil(total / limit)
        const products = await Product.find(filter).populate(userOpts)
            .limit(+limit)
            .skip(+offset)
            .exec()
        res.status(200).json( { products, Count })
    } catch (err) {
        res.status(500).json(err);
    }


})


// // 获得全部商品
// exports.getAllProduct = asyncHandler(async (req, res, next) => {
//     try {
//         const { limit, page } = req.query
//         const offset = (page - 1) * limit
//         let userOpts = [{
//             path: 'userId',
//             select: ['username', 'schoolName'],
//         }]
//         filter = req.body
//         const Count = await Product.find(filter).count();
//         const products = await Product.find(filter).populate(userOpts)
//             .limit(+limit)
//             .skip(+offset)
//             .exec()

//         res.status(200).json(
//             { products, Count })
//     } catch (err) {
//         res.status(500).json(err);
//     }
// })

exports.getAllProduct = asyncHandler(async (req, res, next) => {
    try {
      
        const { limit, page,status,condition ,payed} = req.body
       
        console.log(req.body)
        const offset = (page - 1) * limit
        let userOpts = [{
            path: 'userId',
            select: ['username', 'schoolName'],
        }]
        let filter={

        }
        if (status===0 || status==1 || status==2 || status==3 ) {
            filter.status=status
        }
        if (payed!='') {
            filter.payed=payed
        }
        const total = await Product.find(filter).count();
        const Count= Math.ceil(total / limit)
        const products = await Product.find(filter).populate(userOpts)
            .limit(+limit)
            .skip(+offset)
            .exec()
        res.status(200).json(
            { products, Count })
    } catch (err) {
        res.status(500).json(err);
    }
})
//  获得最新商品

exports.newProduct = asyncHandler(async (req, res, next) => {
    try {
        let userOpts = [{
            path: 'userId',
            select: ['username', 'schoolName'],
        }]
        var filter = req.body.data
        const products = await Product.find(filter).populate(userOpts)
            .limit(4)
            .sort({ "createdAt": -1 })
            .exec()
        console
        res.status(200).json(
            { products })
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
        const { categories, status, condition, position } = req.query
        const filter = {}
        filter.condition = condition
        filter.status = status
        const Min = await Product.find().sort({ price: -1 }).limit(1)
        const Max = await Product.find().sort({ price: 1 }).limit(1)
        min = Min[0].price
        max = Max[0].price
        res.status(200).json([
            min,
            max
        ]);
    } catch (err) {
        console.log(err)
        res.status(500).json(err);
    }
})

// 查询符合价格分类的商品
exports.getPriceProduct = asyncHandler(async (req, res, next) => {
    try {
        const { categories, page, limit, position, payed } = req.body
        let min=req.body.min
        let max=req.body.max
        if (min>max) {
            let num=min
            min=max
            max=num
        }
        const offset = (page - 1) * limit
        const filter = {
            status: 1,
            condition: 1
        }
        if (position !="") {
            if (position != "全部") {
                filter.schoolName = position
            }
        }

        if (categories !="") {
            if(categories!= "全部"){
                filter.categories = categories
            }
           
        }
        if (payed !="") {
            filter.payed = payed
        }
     
        const products = await Product.aggregate(
            [
                {
                    "$lookup":
                    {
                        "from": "users",
                        "localField": "userId",
                        "foreignField": "_id",
                        "as": "fromItems"
                    },
                },

                {
                    $replaceRoot: { newRoot: { $mergeObjects: [{ $arrayElemAt: ["$fromItems", 0] }, "$$ROOT"] } }
                },
                {
                    "$match": {
                        $and:
                            [
                                { price: { $gte: min, $lte: max } },
                                filter
                            ]
                    }
                },
                { $project: { fromItems: 0 } },
                { $skip: offset },
                { $limit: limit },
            ]
        )
        res.status(200).json({ products });
    } catch (err) {
        console.log(err)
        res.status(500).json(err);
    }
})

// 这里采用关联表进行查询
// exports.getPriceProduct = asyncHandler(async (req, res, next) => {
//     try {
//         const {categories,min,max,page,limit,position}=req.body
//         const offset = (page - 1) * limit
//         const filter={
//             categories:categories,
//             status:1,
//             // position:position,
//             condition:1
//         }

//         console.log(categories,min,max,page,limit,position)
//         const products=await Product.aggregate( [
//             { $match : 
//             {$and:
//              [
//               {"price":{ $gte : min, $lte : max } }
//               ,filter
//             //  , {"status":1}
//             //  ,{"categories":"体育"}
//             //  ,{"condition":1}
//             ]
//             }
//             },
//             { $skip : offset},
//             { $limit :limit},
//            ]);
//            console.log(products)
//           res.status(200).json({products});
//     } catch (err) {
//         console.log(err)
//         res.status(500).json(err);
//     }
// })

// //  模糊查询，查询商品
// exports.SearchProduct = asyncHandler(async (req, res, next) => {
//     try {
//         const {title}=req.body
//         console.log(req.body)
//         var str=".*"+title+".*$"
//         var reg = new RegExp(str)
//         const products=await Product.aggregate( [
//             { $addFields: { result:  { $regexMatch: { input: "$title",regex:reg } } } },
//             { $match : 
//             { $and:
//              [
//              {result:{$gte:true}}
//             //  ,{"price":{ $gte : min, $lte : max } }
//              ,{"status":1}
//              ,{"condition":1}
//             ]
//             }
//             },
//            ]);
//          res.status(200).json({products});
//     } catch (err) {
//         console.log(err)
//         res.status(500).json(err);
//     }
// })
// 查询标题

exports.SearchTitle = asyncHandler(async (req, res, next) => {
    try {
        const products = await Product.find({ condition: 1, status: 1, delete: false }, { id: 1, title: 1 })
        res.status(200).json({ products });
    } catch (err) {
        console.log(err)
        res.status(500).json(err);
    }
})
// 查询商品
exports.SearchProduct = asyncHandler(async (req, res, next) => {
    try {
        // let userOpts = [{
        //     path: 'userId',
        //     select: ['username', 'schoolName'],
        //   }]

        const products = await Product.findById(
            req.params.id
        )
        res.status(200).json({ products });
    } catch (err) {
        console.log(err)
        res.status(500).json(err);
    }
})
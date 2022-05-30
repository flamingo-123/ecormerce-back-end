const { Type, Product } = require("../models");
const asyncHandler = require('../middleware/async')
// 创建分类 同时可以创建分类
exports.createType = asyncHandler(async (req, res, next) => {
    console.log(req.body)
    const Types = await Type.find({ title: req.body.title })
    if (Types.length == 0) {
        const newType = new Type(req.body)
        try {
            const Type = await newType.save();
            res.status(200).json(Type);
        } catch (err) {
            res.status(500).json(err);
        }
    } else {
        try {
            if (Types[0].Types.indexOf(req.body.Types) != -1) {
                res.status(201).json({
                    status: 400,
                    message: "已加入分类"
                })
            } else {
                let types = await Type.updateOne(
                    { title: req.body.title },
                    {
                        $push:
                            { Types: req.body.Types },
                    },
                    { new: true }
                );
                res.status(200).json(types)
            }
            res.status(200).json();
        } catch (err) {
            console.log(err)
            res.status(500).json(err);
        }

    }

})

// 删除的分类
exports.DeleteType = asyncHandler(async (req, res, next) => {
    try {
        console.log(req.body)
        let types = await Type.updateOne(
            { title: req.body.title },
            { $pull: { Types: req.body.Types } },
            { new: true }
        );
        res.status(200).json(types);
    } catch (err) {
        res.status(500).json(err);
    }
})
// 获得所有的分类数量
exports.getType = asyncHandler(async (req, res, next) => {
    const types = await Type.find({})
    try {
        const { limit, page } = req.body
        // const offset = (page - 1) * limit
        const Types = await Product.aggregate(
            [
                {
                    "$unwind": "$categories"
                },

                { "$sortByCount": "$categories" }
            ]
         )

        Types.forEach((element, index) => {
            element.id = index + 1
        })
        types[0].Types.shift()
        for(let i=0;i<types[0].Types.length;i++){
            for(let j=0;j<Types.length;j++){
                if (types[0].Types[i]==Types[j]._id) {
                    break;
                }else{
                   if (j==Types.length-1) {
                    Types.push({_id:types[0].Types[i],count:0,id:Types.length+1})
                    break;
                   }
                }
            }
        }
        
        const total = Types.length
        const pageCount = Math.ceil(total / limit)
        res.status(200).json({ Types, pageCount });
    } catch (err) {
        console.log(err)
        res.status(500).json(err);
    }
})


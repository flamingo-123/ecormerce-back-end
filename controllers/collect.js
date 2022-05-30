const { Collect } = require("../models");
const asyncHandler = require('../middleware/async')
//获取收藏
exports.getCollect = asyncHandler(async (req, res, next) => {
    try {
        const {limit,id, page} = req.query
        const offset = (page - 1) * limit
         const collects = await Collect.aggregate(
          [
             {
                "$unwind":"$collects"
              },
              {
                "$match":{"userId":id}
              },
             {
                "$project": 
                {
                    "nid": 
                    {
                        "$convert": {
                            "input": "$collects",
                            "to": "objectId"
                        }
                    },
                }
            },
            {
                "$lookup": 
                {
                    "from": "products",
                    "localField": "nid",
                    "foreignField": "_id",
                    "as": "noteDocs1"
                },
            }
        ]
        ).limit(+limit).skip(+offset)
        res.status(200).json(collects);
    } catch (err) {
        console.log(err)
        res.status(500).json(err);
    }
})

// 增加收藏
exports.addCollect = asyncHandler(async (req, res, next) => {
    const collects = await Collect.find({userId:req.body.userId})
    if (collects.length == 0) {
        const newCollect = new Collect(req.body)
        try {
            const Collect = await newCollect.save();
            res.status(200).json(Collect);
        } catch (err) {
            res.status(500).json(err);
        }
    }
     else {
        try {
            if (collects[0].collects.indexOf(req.body.collects) != -1) {
                res.status(201).json({
                    status:400,
                    message: "已加入收藏"
                })
            } else {
                const collect = await Collect.updateOne(
                    { userId:req.body.userId},
                    {
                        $push:
                            { collects: req.body.collects },
                    },
                    { new: true }
                );
                  res.status(200).json(collect)
            }
        } catch (err) {
              console.log(err)
              res.status(500).json(err);
        }

    }
})

// 清空收藏列表
exports.clearCollects = asyncHandler(async (req, res, next) => {
    try {
        const clearCollect = await Collect.updateOne(
            {userId:req.body.userId},
            {
             $set: req.body,
            },
            { new: true }
        );
        res.status(200).json(clearCollect);
    } catch (err) {
        res.status(500).json(err);
    }
})

// 清除特定商品的收藏
exports.clearCollect = asyncHandler(async (req, res, next) => {
    console.log(req.body)
    try {
        const clearCollect = await Collect.updateOne(
            {userId:req.body.userId},
            {$pull:{collects:req.body.collect}},
            { new: true }
        );
        res.status(200).json(clearCollect);
     } catch (err) {
        res.status(500).json(err);
      }
})


const { Product, User,payOrder,Type} = require("../models");
const asyncHandler = require('../middleware/async')
exports.getData = asyncHandler(async (req, res, next) => {
    try {

        let total = await Product.find({});
        let pays=await payOrder.find({})
        const users=await User.find({})
        const types=await Type.find({title:"分类"})
        res.status(200).json({
            total:total.length,
            pays:pays.length,
            users:users.length,
            types:types[0].Types.length
        });

    } catch (err) {

        res.status(500).json(err);
    }
})
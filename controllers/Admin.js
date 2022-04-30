const asyncHandler = require('../middleware/async')
const ErrorResponse = require('../utils/errorResponse')
const { User } = require("../models");


// 获得全部管理员
exports.getAdmin = asyncHandler(async (req, res, next) => {
    res.status(200).json(res.advancedResults)
})

// 设置用户为管理员
exports.setAdmin = asyncHandler(async (req, res, next) => {
    console.log(req.params.id)
    // const user = await User.findById(req.params.id)
    // user.role = "admin"
    // await user.save();
    // if (!user)
    //     return next(new ErrorResponse(`No user with that id of ${req.params.id}`))
    // res.status(200).json({ success: true, data: user })
})

// 删除管理员
exports.deleteAdmin = asyncHandler(async (req, res, next) => {
    console.log("用户", req.params)
    const user = await User.findById(req.params.id)
    if (!user)
        return next(new ErrorResponse(`No user with that id of ${req.params.id}`))
    await User.findByIdAndDelete(req.params.id)
    res.status(200).json({ success: true, data: {} })
})



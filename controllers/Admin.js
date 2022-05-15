const asyncHandler = require('../middleware/async')
const ErrorResponse = require('../utils/errorResponse')
const { User } = require("../models");
// 获得全部管理员
exports.getAdmin = asyncHandler(async (req, res, next) => {
    res.status(200).json(res.advancedResults)
})

// 设置用户为管理员 并可以进行修改
exports.setAdmin = asyncHandler(async (req, res, next) => {
    const user = await User.findById(req.params.id)
    user.role = "admin"
    await user.save({ validateModifiedOnly: true });
    if (!user)
        return next(new ErrorResponse(`No user with that id of ${req.params.id}`))
    res.status(200).json({ success: true, data: user })
})

// 取消管理员
exports.cancelAdmin = asyncHandler(async (req, res, next) => {
    const user = await User.findById(req.params.id)
    if (!user)
        return next(new ErrorResponse(`No user with that id of ${req.params.id}`))
    user.role = "customer"
    await user.save({ validateModifiedOnly: true });
    res.status(200).json({ success: true, data: {} })
})

//  创建新用户为管理员

exports.createAdmin = asyncHandler(async (req, res, next) => {
    try {
        let user = new User(req.body);
        await user.save();
        user = user.toJSON();
        delete user.password;
        res.status(201).json({
        success: true, data: {}
        });
      } catch (err) {
        next(err);
      }
})


// 更新管理员信息
exports.updateAdmin = asyncHandler(async (req, res, next) => {
    try {
        console.log(req.body)
        const user = await User.findByIdAndUpdate(
            req.params.id,
            {
                $set: req.body,
            },
            { new: true }
            
        );
        res.status(200).json(user);
    } catch (err) {
        res.status(500).json(err);
    }
})
const asyncHandler = require('../middleware/async')
const ErrorResponse = require('../utils/errorResponse')
const { User } = require("../models");
const jwt = require("../utils/jwt");
const sendEmail = require('../utils/sendEmail')
const crypto = require("crypto");

// 用户登录
exports.login = async (req, res, next) => {
  try {
    const user = req.user.toJSON();
    const token = await jwt.sign(
      {
        userId: user._id,
      },
      process.env.jwtSecret,
      {
        expiresIn: 60 * 60 * 24,
      }
    );
    delete user.password;
    res.status(200).json({
      user:user,
      token:token
    });
  } catch (err) {
      next(err);
  }
};

// Registration 用户注册
exports.register = async (req, res, next) => {
  try {
    let user = new User(req.body);
    await user.save();
    user = user.toJSON();
    const token = await jwt.sign(
      {
        userId: user._id,
      },
      process.env.jwtSecret,
      {
        expiresIn: 60 * 60 * 24,
      }
    );
    delete user.password;
    res.status(200).json({
      user:user,
      token:token
    });
  } catch (err) {
    next(err);
  }
};

// 获得全部的用户
exports.getUsers = asyncHandler(async (req, res, next) => {
  res.status(200).json(res.advancedResults)
})


// 获得特定的用户
exports.getUser = asyncHandler(async (req, res, next) => {
  const user = await User.findById(req.params.id)
  if (!user)
    return next(new ErrorResponse(`No user with that id of ${req.params.id}`))
  res.status(200).json({ success: true, data: user })
})


// 更新用户内容
exports.updateUser = asyncHandler(async (req, res, next) => {
  req.body.password = ''
  delete req.body.password
  const user = await User.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
    context: 'query'
  })
  if (!user)
    return next(new ErrorResponse(`No user with that id of ${req.params.id}`))
  res.status(200).json({ success: true, data: user })
})

// 删除用户
exports.deleteUser = asyncHandler(async (req, res, next) => {
  console.log("用户",req.params)
  const user = await User.findById(req.params.id)

  if (!user)
    return next(new ErrorResponse(`No user with that id of ${req.params.id}`))
  await User.findByIdAndDelete(req.params.id)
  res.status(200).json({ success: true, data: {} })
})

// 用户更改密码
exports.updatePassword = asyncHandler(async (req, res, next) => {
  try {
    const user = await User.findById(req.user.id).select('+password')
    user.password = req.body.newPassword
    await user.save({ validateModifiedOnly: true })
    res.status(200).json({
    });
  } catch (err) {
    console.log(err)
    next(err);
  }
})


exports.forgotPassword = asyncHandler(async (req, res, next) => {
  const user = await User.findOne({ email: req.body.email.toLowerCase() })
  if (!user) {
    return next(new ErrorResponse('There is no user with that email', 404))
  }
  const resetToken = user.getResetPasswordToken()
  await user.save({ validateBeforeSave: false })
  console.log("resetToken", resetToken)
  console.log("更改后的信息", user)
  const resetUrl = `${req.protocol}://${req.get(
    'host'
  )}/api/resetPassword/${resetToken}`
  const message = `你收到修改密码的邮件，请打开连接后修改密码: \n\n ${resetUrl}`
  console.log("message", message)
  try {
    await sendEmail({
      email: user.email,
      subject: 'Password reset token',
      message
    })
    res.status(200).json({ success: true, data: 'Email sent' })
  } catch (err) {
    user.resetPasswordToken = undefined
    user.resetPasswordExpire = undefined
    await user.save({ validateBeforeSave: false })
    return next(new ErrorResponse('Email could not be sent', 500))
  }
})

exports.resetPassword = asyncHandler(async (req, res, next) => {
  try {
    const resetPasswordToken = crypto
      .createHash('sha256')
      .update(req.params.id)
      .digest('hex')
    const user = await User.findOne({
      resetPasswordToken,
      resetPasswordExpire: { $gt: Date.now() }
    })
    console.log("id", req.params)
    console.log("获取Token", resetPasswordToken)
    if (!user) {
      return next(new ErrorResponse('Invalid token', 400))
    }
    user.password = req.body.password
    user.resetPasswordToken = undefined
    user.resetPasswordExpire = undefined
    await user.save({ validateModifiedOnly: true })
    res.status(200).json({
      success: "true", data: "更改成功！"
    });
  } catch (err) {
    console.log(err)
    next(err);
  }
})
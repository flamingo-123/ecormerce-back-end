const crypto = require('crypto')
const mongoose = require('mongoose')
const bcrypt = require('bcryptjs')
const uniqueValidator = require('mongoose-unique-validator')
const md5 = require("../utils/md5");
const baseModle = require("./base-model");
const baseModel = require('./base-model');
const UserSchema = new mongoose.Schema(
  {
    ...baseModel,
    username: {
      type: String,
      required: true,
      unique: true
    },
    profession: {
      type: String,
      default:null
    },
    schoolName: {
      type: String,
      required: true
    },
    phone: {
      type: String,
      required: true,
    },
    email: {
      type: String, required: true,
      unique: true, 
      uniqueCaseInsensitive: true
    },
    password: {
      type: String,
      required: true,
      set: (value) => md5(value),
      select: false
    },
    role: {
      type: String,
      default: "customer",
    },
    photoUrl: { type: String, default: "no_photo.jpg" },
    resetPasswordToken: String,
    resetPasswordExpire: Date
  },
  { toJSON: { virtuals: true }, toObject: { virtuals: true }, timestamps: true }
)
UserSchema.virtual('orders', {
  ref: 'Order',
  localField: '_id',
  foreignField: 'userId',
  justOne: false,
  count: true,
  match: { userId: this._id }
})
UserSchema.index({ email: 'text' })
UserSchema.plugin(uniqueValidator, { message: '{PATH} already exists.' })
UserSchema.methods.getResetPasswordToken = function () {
  const resetToken = crypto.randomBytes(20).toString('hex')
  this.resetPasswordToken = crypto
    .createHash('sha256')
    .update(resetToken)
    .digest('hex')
  this.resetPasswordExpire = Date.now() + 10 * 60 * 1000
  return resetToken
}
module.exports = UserSchema
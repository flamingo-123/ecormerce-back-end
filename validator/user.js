const { body } = require("express-validator");
const validate = require("../middleware/validate");
const { User } = require("../models");
const md5 = require("../utils/md5");

exports.register = validate([
  body("username")
    .notEmpty()
    .withMessage("用户名不能为空")
    .custom(async (value) => {
      const user = await User.findOne({ username: value });
      if (user) {
        return Promise.reject("用户已存在");
      }
    }),

  body("password").notEmpty().withMessage("密码不能为空").isLength({ min: 6 }).withMessage("密码不能 至少5位数！"),
  body("email")
    .notEmpty()
    .withMessage("邮箱不能为空")
    .isEmail()
    .withMessage("邮箱格式不正确")
    .bail()
    .custom(async (value) => {
      const user = await User.findOne({ email: value });
      if (user) {
        return Promise.reject("邮箱已存在");
      }
    }),
])




exports.login = [
  validate([
    body("email").notEmpty().withMessage("邮箱不能为空"),
    body("password").notEmpty().withMessage("密码不能为空"),
  ]),
  validate([
    body("email").custom(async (email, {req}) => {
      const user = await User.findOne({ email }).select([
        "email",
        "password",
        "username",
        "schoolName"
      ]);
      if (!user) {
        return Promise.reject("用户不存在")
      }
      req.user = user;
    }),
  ]),
  validate([
    body("password").custom(async (password, { req }) => {
      if (md5(password) !== req.user.password) {
        return Promise.reject("密码错误");
      }
    }),
  ]),
];


exports.updatePassword =[
  validate([
    body("email").custom(async (email, { req }) => {
      let password = await User.findOne({email}).select("password");
      // console.log(password)
      req.pwd = password
    })
  ]),
  validate([
    body("currentPassword").notEmpty().withMessage("邮箱不能为空").custom(async (currentPassword, { req })=>{
      if (md5(currentPassword) !== req.pwd.password) {
        return Promise.reject("当前密码错误！");
      }
    })
  ])
]
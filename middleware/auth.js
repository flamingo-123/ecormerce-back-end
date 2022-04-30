const { verify } = require("../utils/jwt");
const {User} = require("../models");
const ErrorResponse = require('../utils/errorResponse')
exports.protect= async (req, res, next) => {
  const token = req.headers.authorization.split(" ")[1];
  if (!token) {
    return res.status(401).json("用户不具有权限");
  }
  try {
    const decodedToken = await verify(token,process.env.jwtSecret);
    req.user = await User.findById(decodedToken.userId);
    next();
  } catch (err) {
    return res.status(401).end();
  }
}
exports.authorize = (...roles) => {
    return (req, res, next) => {
      if (!roles.includes(req.user.role)) {
        return next(
          new ErrorResponse(
            `用户 ${req.user.role} 没有权限`,
            403
          )
        )
      }
      next()
    }
  }

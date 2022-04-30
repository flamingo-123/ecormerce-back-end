
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
      ...user,
      token,
    });
  } catch (err) {
    next(err);
  }
};

// Registration 用户注册
exports.register = async (req, res, next) => {
  try {
    let user = new User(req.body.user);
    await user.save();
    user = user.toJSON();
    delete user.password;
    res.status(201).json({
      user,
    });
  } catch (err) {
    next(err);
  }
};

// Get Current User 获取当前登录用户
exports.getCurrentUser = async (req, res, next) => {
  try {
    res.status(200).json({
      user: req.user,
    });
  } catch (err) {
    next(err);
  }
};

// Update User 更新用户
exports.updateUser = async (req, res, next) => {
  try {
    // 处理请求
    res.send("put /user");
  } catch (err) {
    next(err);
  }
};

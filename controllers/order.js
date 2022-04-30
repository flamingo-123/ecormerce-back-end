const { Order } = require("../models");
const asyncHandler = require('../middleware/async')
const mongoose = require("mongoose");
// 创建订单
exports.createOrder = asyncHandler(async (req, res, next) => {

  try {
    const newOrder = new Order(req.body);
    // newOrder.populate('userId')
    // .execPopulate() // returns promise
    // .then(function (document) {
    //   console.log(document);
    // });
    // // newOrder.populate("products.productId").execPopulate();
    // console.log("123")
    const savedOrder = await newOrder.save();
    res.status(200).json(savedOrder);
  } catch (err) {
    console.log(err)
    res.status(500).json(err);
  }
})
// 修改订单
exports.updateOrder = asyncHandler(async (req, res, next) => {
  try {
    const updatedOrder = await Order.update(
      {
        status:"pending"
      },
      {
        $set: {status:"cleared"},
      },
      { multi: true }
    );
    res.status(200).json(updatedOrder);
  } catch (err) {
    console.log(err)
    res.status(500).json(err);
  }
})
// 删除订单
exports.DeleteOrder = asyncHandler(async (req, res, next) => {
  try {
    await Order.findByIdAndDelete(req.params.id);
    res.status(200).json("Order has been deleted...");
  } catch (err) {
    res.status(500).json(err);
  }
})
// 获得用户订单
exports.getUserOrders = asyncHandler(async (req, res, next) => {
  try {
    const {limit,id,page}=req.query
    const offset=(page-1)*limit
    let userOpts = [{
      path: 'userId',
      select: ['username', 'schoolName'],
    
    }]
    let productOpts = [{
      path: 'productId',
    }]
    filter={
      userId:  id,
      status: "pending"
    }
  const Count = await Order.find(filter).count();
  const Orders= await Order.find(filter).populate(userOpts)
    .populate(productOpts)
    .limit(+limit)
    .skip(+offset)
    .exec()
    res.status(200).json({
      Orders:Orders,
      count:Count
    });
  } catch (err) {
    res.status(500).json(err);
  }
})
// 获得所有订单
exports.getOrders = asyncHandler(async (req, res, next) => {
  try {
    const orders = await Order.find();
    res.status(200).json(orders);
  } catch (err) {
    res.status(500).json(err);
  }
})
// 计算所有的金额
exports.income = asyncHandler(async (req, res, next) => {
  const date = new Date();
  const lastMonth = new Date(date.setMonth(date.getMonth() - 1));
  const previousMonth = new Date(new Date().setMonth(lastMonth.getMonth() - 1));
  try {
    const income = await Order.aggregate([
      { $match: { createdAt: { $gte: previousMonth } } },
      {
        $project: {
          month: { $month: "$createdAt" },
          sales: "$amount",
        },
      },
      {
        $group: {
          _id: "$month",
          total: { $sum: "$sales" },
        },
      },
    ]);
    res.status(200).json(income);
  } catch (err) {
    res.status(500).json(err);
  }
})



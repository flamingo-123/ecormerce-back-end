const asyncHandler = require('../middleware/async')
const alipaySdk = require("../config/alipay")
const AlipayFormData = require("alipay-sdk/lib/form").default;
const { payOrder } = require("../models");
const { Order } = require("../models");
const { Product } = require("../models");

const axios = require('axios')
// 支付宝处理模块
exports.payOrder = asyncHandler(async (req, res, next) => {
  try {
    const newOrder = new payOrder(req.body);
    const savedOrder = await newOrder.save();
    res.status(200).json(savedOrder);
  } catch (err) {
    console.log(err)
    res.status(500).json(err);
  }
})
exports.updateProduct = asyncHandler(async (req, res, next) => {
  try {

    res.status(200).json({
    });
  } catch (err) {
    console.log(err)
    res.status(500).json(err);
  }
})

exports.payment = asyncHandler(async (req, res, next) => {
  const formData = new AlipayFormData();
  const { totalPrice, OrderId } = req.body
  formData.setMethod('get');
  formData.addField('bizContent', {
    outTradeNo: OrderId, // 商户订单号,64个字符以内、可包含字母、数字、下划线,且不能重复
    productCode: 'FAST_INSTANT_TRADE_PAY', // 销售产品码，与支付宝签约的产品码名称,仅支持FAST_INSTANT_TRADE_PAY
    totalAmount: totalPrice, // 订单总金额，单位为元，精确到小数点后两位
    subject: '商品付款', // 订单标题
    body: '商品详情', // 订单描述
  });
  formData.addField('returnUrl', 'http://localhost:8080/paySuccess');
  const result = alipaySdk.exec(  // result 为可以跳转到支付链接的 url
    'alipay.trade.page.pay',      // 统一收单下单并支付页面接口
    {},                           // api 请求的参数（包含“公共请求参数”和“业务参数”）
    { formData: formData },
  );
  result.then((resp) => {
    res.send({
      success: 'true',
      code: 200,
      'result': resp
    })
  })
})


exports.queryOrder = asyncHandler(async (req, res, next) => {
  const { out_trade_no, trade_no } = req.body;
  const formData = new AlipayFormData();
  formData.setMethod('get');
  formData.addField('bizContent', {
    out_trade_no,
    trade_no
  });
  const result = alipaySdk.exec(
    'alipay.trade.query',
    {},
    { formData: formData },
  );
  result.then(resData => {
    axios({
      method: 'GET',
      url: resData
    })
      .then(async (data) => {
        let r = data.data.alipay_trade_query_response;
        if (r.code === '10000') { // 接口调用成功
          switch (r.trade_status) {
            case 'WAIT_BUYER_PAY':
              res.send('交易创建，等待买家付款');
              break;
            case 'TRADE_CLOSED':
              res.send('未付款交易超时关闭，或支付完成后全额退款');
              break;
            case 'TRADE_SUCCESS':
              const payOrders = await payOrder.findByIdAndUpdate(out_trade_no, { payed: true })
              await Order.updateMany(
                { $id: { $in: payOrders.products } },
                { $set: { payed: true } })
              //更新账单
              const productList = []
              Order.find({ _id: { $in: payOrders.products } }, function (err, docs) {
                if (err) {
                  console.log(err);
                }
                else {
                  docs.forEach(element => {
                    productList.push(element.productId.toString())
                  });
                  Product.updateMany(
                    { _id: { $in: productList } },
                    { $set: { condition: '2' } }, function (err, docs) {
                      if (err) {
                        console.log(err);
                      }
                      else {
                        console.log(docs)
                      }
                    })
                }
              })
              res.send({
                msg: '支付交易成功！',
                code: 200,
              })
              break;
            case 'TRADE_FINISHED':
              await payOrder.findByIdAndUpdate(out_trade_no, { payed: true })
              res.send('交易结束，不可退款');
              break;
          }
        } else if (r.code === '40004') {
          res.send('交易不存在');
        }
      })
      .catch((err) => {
        console.log(err)
      })
  })
})
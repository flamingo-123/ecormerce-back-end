const express=require("express")
const path=require("path")
const app=express()
const cors =require("cors")
const dotenv=require("dotenv")
const router = require("./routes");
const { json } = require("express")
const DBConnection = require('./config/db.js')
dotenv.config({ path: './config/.env' })
DBConnection()
const  alipaySdk=require("./config/alipay")
const  AlipayFormData = require("alipay-sdk/lib/form").default;
router.post('/payment',function(req,res,next){
    console.log("123")
    const formData = new AlipayFormData();
    formData.setMethod('get');
    formData.addField('notifyUrl', 'https://www.baidu.com');
    formData.addField('bizContent', {
      outTradeNo: '15693801273222', // 商户订单号,64个字符以内、可包含字母、数字、下划线,且不能重复
      productCode: 'FAST_INSTANT_TRADE_PAY', // 销售产品码，与支付宝签约的产品码名称,仅支持FAST_INSTANT_TRADE_PAY
      totalAmount: '0.03', // 订单总金额，单位为元，精确到小数点后两位
      subject: '商品', // 订单标题
      body: '商品详情', // 订单描述
    });
    formData.addField('returnUrl', 'http://localhost:8082/');
    const result =  alipaySdk.exec(  // result 为可以跳转到支付链接的 url
      'alipay.trade.page.pay', // 统一收单下单并支付页面接口
      {}, // api 请求的参数（包含“公共请求参数”和“业务参数”）
      { formData: formData },
    );
      result.then((resp)=>{
          res.send({
              success:'true',
              code:200,
             'result':resp
          })
      })
  
})
app.use('/uploads',express.static(path.join(__dirname,'./uploads')))
app.use(cors())
app.use(json())
app.use("/api", router);
app.listen(process.env.PORT || 5000,()=>{console.log("backend server is running!")})
const express=require("express")
const path=require("path")
const app=express()
const http = require('http').Server(app);
const cors =require("cors")
const dotenv=require("dotenv")
const router = require("./routes");
const { json } = require("express")
const DBConnection = require('./config/db.js');
dotenv.config({ path: './config/.env' })
require("./utils/chat")(http)
DBConnection()
// 聊天模块
app.use('/uploads',express.static(path.join(__dirname,'./uploads')))
app.use(cors())
app.use(json())
app.use("/api", router);
http.listen(process.env.PORT || 5000,()=>{console.log("backend server is running!")})
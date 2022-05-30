module.exports = http => {
    const { Chat } = require("../models");
    const io = require('socket.io')(http, {
        allowEIO3: true,
        cors: {
            origin: "http://localhost:8080",
            methods: ["GET", "POST"],
            credentials: true,
            allowEIO3: true,
            transport: ['websocket']
        }
    });
    io.on('connection', async function (socket) {
        socket.on("login",(data,callback)=>{
            console.log(data)
            /* 遍历服务器连接对象 */
            io.sockets.sockets.forEach(iss => {
                console.log("iss",iss.name)
            })
        })
        const chats = await Chat.findById({"_id":"6288d059484f2a6998177254"})
        socket.emit("message",chats)
        // socket.on('sendMessage', async (data, callback) => {
        //     const chats = await Chat.find()
        //     if (chats.length == 0) {
        //     const newChat = new Chat({chats:data})
        //     newChat.save()
        //     }
        //     await Chat.updateOne(
        //         {"_id":"6288d059484f2a6998177254"},
        //         {
        //             $push:{ 
        //             "chats":
        //             {
        //                 $each: [data],
        //                 $slice: -50
        //               }
        //         },
        //         },
        //         { new: true },
        //    );
        // })
    })
}




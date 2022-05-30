const mongoose = require("mongoose");
const chatSchema = new mongoose.Schema(
  {
    chats:{ type: Array, required: true },
  },
   { timestamps: true }
);
module.exports =  chatSchema
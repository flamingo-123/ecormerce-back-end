const models = require("../models");
const { Chat } = require("../models");
const asyncHandler = require('../middleware/async')
exports.createChat=asyncHandler(async (req, res, next) => {
    try {
        const newChat = new Chat(body)
        newChat.save()
     } catch (err) {
        res.status(500).json(err);
      }
})

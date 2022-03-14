const mongoose = require('mongoose');

let ChatSchema = mongoose.Schema({
    Category: String,
    Subject: String,
    Messages: Array
},
    { timestamps: true }
)

let ChatModel = mongoose.model('Chat',ChatSchema,'Chat');

module.exports = ChatModel;
const mongoose = require('mongoose');

let MessageSchema = mongoose.Schema({
    // ConversationId: String,
    SenderId: String,
    Text: String
},
    { timestamps: true }
)

let MessageModel = mongoose.model('Message', MessageSchema, 'message');

module.exports = MessageModel;
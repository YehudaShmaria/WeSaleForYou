const mongoose = require('mongoose');

let ConversationSchema = mongoose.Schema({
   Members: Array,
   Messages: Array
},
{ timestamps: true }
)

let ConversationModel = mongoose.model('Conversation',ConversationSchema,'Conversation');

module.exports = ConversationModel;
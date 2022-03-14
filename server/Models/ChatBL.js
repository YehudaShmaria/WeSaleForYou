const ChatModel = require('../ModelData/ChatModel')



const GetAll = () => {
    return new Promise((resolve, reject) => {
        ChatModel.find({}, (err, data) => {
            if (err) {
                reject(err);
            }
            else {
                resolve({ message: "Get All succses", AllChat: data });
            }
        })
    })
}


const GetChat = (id) => {
    return new Promise((resolve, reject) => {
        ChatModel.findById(id, (err, data) => {
            if (err) {
                reject(err);
            }
            else {
                resolve({ message: "Get One success !", Chat: data });
            }
        })
    })
}

const CreateChat = (obj) => {
    return new Promise((resolve, reject) => {
        const Chat = new ChatModel({
            Category: obj.Category,
            Subject: obj.Subject,
            Messages: [],
        })
        Chat.save((err, data) => {
            if (err) {
                reject(err);
            }
            else {
                resolve({ message: "Conversation Created!", Chat: data });
            }
        })
    })
}

const AddMessage = (id, message) => {
    return new Promise((resolve, reject) => {
        ChatModel.findOneAndUpdate({ _id: id }, { $push: { Messages: message } }, { new: true }, (err, data) => {
            if (err) {
                reject(err);
            }
            else {
                resolve({ message: "Message added!", Chat: data });
            }
        })
    })
}

module.exports = { CreateChat, AddMessage, GetAll, GetChat }
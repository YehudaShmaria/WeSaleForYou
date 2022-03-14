const ConversationModel = require('../ModelData/ConevrsationModel');

/*
1 Create Conversation
2 Find all user conversation 
3 Find a specific conversation
*/


const CreateConversation = (obj) => {
    return new Promise((resolve, reject) => {
        const Conversation = new ConversationModel({
            Members: obj,
            Messages: []
        });
        Conversation.save((err, data) => {
            if (err) {
                reject(err);
            }
            else {
                resolve({ message: "Conversation Created!", Conversation: data });
            }
        })
    })
}

const FindConversationByUserId = (userId) => {
    return new Promise((resolve, reject) => {
        ConversationModel.find({ Members: { $in: [userId] } }).sort({ updatedAt: -1 }).exec((err, data) => {
            if (err) {
                reject(err);
            }
            else {
                resolve(data);
            }
        })
    })
}

const FindConversation = (obj) => {
    return new Promise((resolve, reject) => {
        ConversationModel.findOne({ Members: [obj[0], obj[1]] }, { Members: [obj[0], obj[1]] }, (err, data) => {
            if (err) {
                reject(err);
            }
            else {
                if (data) {
                    resolve({ message: "There are Conversation", Conversation: data });
                }
                else {
                    resolve({ message: "There are no Conversation", Conversation: null });
                }
            }
        })
    })
}

const AddMessage = (id, obj) => {
    return new Promise((resolve, reject) => {
        ConversationModel.findOneAndUpdate({ _id: id }, { $push: { Messages: obj } }, { new: true }, (err, data) => {
            if (err) {
                reject(err);
            }
            else {
                resolve(data);
            }
        })
    })
}

const RemoveMessage = (id, obj) => {
    return new Promise((resolve, reject) => {
        ConversationModel.findOneAndUpdate({ _id: id }, { $pull: { Messages: obj } }, { new: true }, (err, data) => {
            if (err) {
                reject(err);
            }
            else {
                resolve(data);
            }
        })
    })
}


module.exports = { CreateConversation, FindConversationByUserId, FindConversation, AddMessage, RemoveMessage }
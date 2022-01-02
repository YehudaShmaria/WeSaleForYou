const MessageModel = require('../ModelData/MessageModel');
const ConversationBL = require('./ConversationBL')

/*
1 Add Message to the Conversation
2 Get All Messages
*/


const CreateMessage = (id,obj) =>
{
    return new Promise((resolve,reject) =>
    {
        const Message = new MessageModel({
            SenderId: obj.SenderId,
            Text: obj.Text
        });
        Message.save((err,data) =>
        {
            if(err)
            {
                reject(err);
            }
            else
            {
                ConversationBL.AddMessage(id,data).then(conversation =>
                    {
                        resolve({message:"The Message is Recive", Message:data, Conversation: conversation});
                    })
            }
        })
    })
}

const DeleteMessage = (id,conversationId) =>
{
    return new Promise((resolve, reject) =>
        {
            MessageModel.findByIdAndDelete(id,(err,data)=>
            {
                if(err)
                {
                    reject(err);
                }
                else
                {
                    ConversationBL.RemoveMessage(conversationId,data).then(conversation =>
                        {
                            resolve({message:"The Message was Deleted!", Message:data, Conversation: conversation});
                        });
                }
            })
        })
}

// const GetAllMessage = (ConversationId) =>
// {
//     return new Promise((resolve,reject) =>
//     {
//         MessageModel.find({ConversationId:ConversationId},(err,data)=>
//         {
//             if(err)
//             {
//                 reject(err);
//             }
//             else
//             {
//                 resolve(data);
//             }
//         })
//     })
// }




module.exports = {CreateMessage, DeleteMessage}
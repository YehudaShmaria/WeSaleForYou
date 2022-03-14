const express = require('express');
const MessageBL = require('../Models/MessageBL');

let router = express.Router();


router.route('/:id').post((req, res) => {
    try {

        let id = req.params.id;
        let obj = req.body;
        MessageBL.CreateMessage(id, obj).then(data => {
            res.status(200).send(data);
        })
    }
    catch
    {
        res.status(401).send({ message: "Sory Something went wrong during the process" })
    }
});

router.route('/:conversationid/:id').delete((req, res) => {
    try {
        let id = req.params.id;
        let conversationId = req.params.conversationid;
        MessageBL.DeleteMessage(id, conversationId).then(data => {
            res.status(200).send(data);
        })
    }
    catch
    {
        res.status(401).send({ message: "Sory Something went wrong during the process" })
    }
})

// router.route('/:conversationId').get((req,res)=>
// {
//     try{
//         let conversationId = req.params.conversationId;
//         MessageBL.GetAllMessage(conversationId).then(data =>
//             {
//                 res.send(data);
//             })
//     }
//     catch
//     {
//         res.status(401).send({message:"Sory Something went wrong during the process"})
//     }

// })

module.exports = router;

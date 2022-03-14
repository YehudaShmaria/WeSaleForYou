const express = require('express');
const ConversationBL = require('../Models/ConversationBL');

let router = express.Router();


router.route('/').post((req, res) => {
    try {
        let obj = req.body;
        ConversationBL.CreateConversation(obj).then(data => {
            res.send(data);
        })
    }
    catch
    {
        res.status(401).send({ message: "Sory Something went wrong during the process" })
    }
});

router.route('/:userId').get((req, res) => {
    try {
        let userId = req.params.userId;
        ConversationBL.FindConversationByUserId(userId).then(data => {
            res.send(data);
        })
    }
    catch
    {
        res.status(401).send({ message: "Sory Something went wrong during the process" })
    }
});

router.route('/getconversation').post((req, res) => {
    try {
        let obj = req.body;
        ConversationBL.FindConversation(obj).then(data => {
            res.status(200).send(data);
        })
    }
    catch {
        res.status(401).send({ message: "Sory Something went wrong during the process" })
    }
})

module.exports = router;

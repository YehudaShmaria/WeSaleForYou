const express = require('express');
const ChatBL = require('../Models/ChatBL');

let router = express.Router();

router.route('/').get((req, res) => {
    try {
        ChatBL.GetAll().then(data => {
            res.status(200).send(data);
        });
    }
    catch {
        res.status(401).send({ message: "Sory Something went wrong during the process" })
    }
});

router.route('/:id').get((req, res) => {
    try {
        let id = req.params.id;
        ChatBL.GetChat(id).then(data => {
            res.status(200).send(data);
        });
    }
    catch {
        res.status(401).send({ message: "Sory Something went wrong during the process" });
    }
});

router.route('/').post((req, res) => {
    try {
        let obj = req.body;
        ChatBL.CreateChat(obj).then(data => {
            res.status(200).send(data);
        });
    }
    catch {
        res.status(401).send({ message: "Sory Something went wrong during the process" });
    }
});

router.route('/:id').put((req, res) => {
    try {
        let id = req.params.id;
        let obj = req.body;
        ChatBL.AddMessage(id, obj).then(data => {
            res.status(200).send(data);
        });
    }
    catch {
        res.status(401).send({ message: "Sory Something went wrong during the process" })
    }
})

module.exports = router;
const express = require('express');
const CategoryBL = require('../Models/CategoryBL');

const router = express.Router();

router.route('/').get((req, res) => {
    try {
        CategoryBL.GetAll().then(data => {
            res.send(data);
        });
    }
    catch {
        res.status(401).send({ message: "Sory Something went wrong during the process" })
    }

})

router.route('/:id').get((req, res) => {
    try {
        let id = req.params.id;
        CategoryBL.GetCategory(id).then(data => {
            res.send(data);
        })
    }
    catch {
        res.status(401).send({ message: "Sory Something went wrong during the process" })
    }

})

router.route('/:id').delete((req, res) => {
    try {
        let id = req.params.id;
        CategoryBL.DeleteCategory(id).then(data => {
            console.log(data);
            res.send(data);
        })
    }
    catch
    {
        res.status(401).send({ message: "Sory Something went wrong during the process" })
    }

})

router.route('/:id').put((req, res) => {
    try {
        let id = req.params.id;
        let obj = req.body;
        CategoryBL.UpdateCategory(id, obj).then(data => {
            res.send(data);
        })
    }
    catch
    {
        res.status(401).send({ message: "Sory Something went wrong during the process" })
    }

})

router.route('/').post((req, res) => {
    try {
        let obj = req.body;
        CategoryBL.CreateCategory(obj).then(data => {
            res.send(data);
        })
    }
    catch
    {
        res.status(401).send({ message: "Sory Something went wrong during the process" })
    }
})

router.route('/getallinmain/:type').get((req, res) => {
    try {

        let type = req.params.type;
        CategoryBL.GetAllInMain(type).then(data => {
            res.send(data);
        })
    }
    catch {
        res.status(401).send({ message: "Sory Something went wrong during the process" })
    }
})


module.exports = router;

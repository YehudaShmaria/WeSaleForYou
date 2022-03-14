const express = require('express');
const SallerModel = require('../ModelData/SallerModel');
const SallerBL = require('../Models/SallerBL')

const router = express.Router();

router.route('/').get((req, res) => {
    SallerBL.GetAll().then(data => {
        res.send(data)
    })
})

router.route('/:id').get((req, res) => {
    let id = req.params.id
    SallerBL.GetSaller(id).then(data => {
        res.send(data);
    })
})

router.route('/').post((req, res) => {
    let obj = req.body;
    try {
        SallerBL.CreateSaller(obj).then(data => {
            res.status(200).send(data);
        });
    }
    catch {
        res.status(401).send({ message: "Sory Something went wrong during the process" })
    }

})

router.route('/:id').put((req, res) => {
    let id = req.params.id;
    let obj = req.body;
    try {
        SallerBL.UpdateSaller(id, obj).then(data => {
            res.send(data);
        });
    }
    catch
    {
        res.status(401).send({ message: "Sory Something went wrong during the process" })
    }

});

router.route('/:id').delete((req, res) => {
    let id = req.params.id;
    try {
        SallerBL.DeleteSaller(id).then(data => {
            res.send(data)
        });
    }
    catch
    {
        res.status(401).send({ message: "Sory Something went wrong during the process" })
    }
});


router.route('/userid/:id').get((req, res) => {
    let userId = req.params.id;
    try {
        SallerBL.GetSallerWithUserId(userId).then(data => {
            res.status(200).send(data);
        });
    }
    catch
    {
        res.status(401).send({ message: "Sory Something went wrong during the process" })
    }


});

module.exports = router;


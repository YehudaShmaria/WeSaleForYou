const express = require('express');
const MainCategoryBL = require('../Models/MainCategoryBL')

const router = express.Router();

router.route('/').get((req,res)=>
{
    try{
        MainCategoryBL.GetAll().then(data =>
            {
                res.send(data);
            });
    }
    catch{
        res.status(401).send({message:"Sory Something went wrong during the process"})
    }
    
})

router.route('/:id').get((req,res)=>
{
    try{
        let id = req.params.id;
        MainCategoryBL.GetMainCategory(id).then(data =>
            {
                res.send(data);
            })
    }
    catch{
        res.status(401).send({message:"Sory Something went wrong during the process"})
    }
    
})

router.route('/:id').delete((req,res)=>
{
    try{
        let id = req.params.id;
        MainCategoryBL.DeleteMainCategory(id).then(data =>
            {
                res.send(data);
            })
    }
    catch
    {
        res.status(401).send({message:"Sory Something went wrong during the process"})
    }
    
})

router.route('/:id').put((req,res)=>
{
    try{
        let id = req.params.id;
        let obj = req.body;
        MainCategoryBL.UpdateMainCategory(id, obj).then(data =>
            {
                res.send(data);
            })
    }
    catch
    {
        res.status(401).send({message:"Sory Something went wrong during the process"})
    }
    
})

router.route('/').post((req,res)=>
{
    try{
        let obj = req.body;
        MainCategoryBL.CreateMainCategory(obj).then(data =>
            {
                res.send(data);
            })
    }
    catch
    {
        res.status(401).send({message:"Sory Something went wrong during the process"})
    }
})

module.exports = router;

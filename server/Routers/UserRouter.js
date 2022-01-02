const express = require('express');
const UserBL = require('../Models/UserBL')
const jwt = require('jsonwebtoken');
const uplodaMiddleware = require('../Middlewares/uploadImage');
const router = express.Router();


router.route('/').get((req,res)=>
{
    UserBL.GetAll().then(data => {
        res.send(data)
    })
})

router.route('/:id').get((req,res)=>
{
    try{
        let id = req.params.id;
        UserBL.GetUser(id).then(data =>
            {
                res.send(data);
            })
    }
    catch
    {
        res.status(401).send("Sory Something went wrong during the process");
    }
    
})

router.route('/').post(uplodaMiddleware.single("ProfileImage"),(req,res)=>
{
    try{
        let image = "";
        let obj = req.body;
        if(req.file)
        {
            image = req.file.path
        }
            if(req.noImage)
            {
                res.status(401).send({message:"The File Is Not Support!"});
            }
            else
            {
                UserBL.CreateUser(obj,image).then(data=>
                    {
                        data === "Created!" ? res.send(data) : res.status(401).send({message:data})
                    });
            }
        }
    catch
    {
        res.status(401).send("Sory Something went wrong during the process");
    }
})

router.route('/:id').put((req,res)=>{
    let id = req.params.id;
    let obj = req.body;
    try{
        UserBL.UpdateUser(id,obj).then(data =>
            {
                res.status(200).send(data);
            });
    }catch{
        res.status(401).send({message:"Sory Something went wrong during the process"})
    }
    
});

router.route('/:id').delete((req,res)=>
{
    let id = req.params.id;
    try{
        UserBL.DeleteUser(id).then(data =>
            {
                res.status(200).send(data);
            });
    }catch{
        res.send.status(401).send({message:"Sory Something went wrong during the process"})
    }
});

router.route('/updateimage/:id').post(uplodaMiddleware.single("ProfileImage"),(req,res)=>
{
    try{
        let id = req.params.id;
        let image = req.file.path;
        UserBL.UpdateProfileImage(id,image).then(data => {
            res.status(200).send({message:data,newImage:image});
        })
    }catch{
        res.status(401).send({message:"The File Is Not Support!"})
    }
})

router.route('/deleteimage/:id').get((req,res)=>
{
    try{
        let id = req.params.id;
        UserBL.DeleteProfileImage(id).then(data => {
            res.status(200).send(data);
        })
    }catch{
        res.status(401).send({message:"Sory Something went wrong during the process"})
    }
});


module.exports = router;


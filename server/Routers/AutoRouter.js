const express = require('express');
const UserModel = require('../ModelData/UserModel');
const UserBL = require('../Models/UserBL')
const middlewareAuth = require('../Middlewares/auth')
const jwt = require('jsonwebtoken');

const router = express.Router();

router.route('/').post((req,res)=>
{
    try
    {
        const RSA_PRIVATE_KEY = "yehuda";
        let email = req.body.Email;
        let password = req.body.Password;
            UserBL.SignIn(email,password).then(data =>
                {
                    if(data)
                    {
                        let id = data._id.toString();
                        let tokenData = jwt.sign({id:id},RSA_PRIVATE_KEY);
                        res.status(200).send({user:data, token:tokenData})
                    }
                    else
                        res.status(401).send({message:"Your not in The Data Base"});
                });
    }
    catch{
        res.status(401).send({message:"Sory Something went wrong during the process"})
    }
})

router.route('/').get(middlewareAuth,(req,res)=>
{
    try{
        UserBL.GetUser(req.userId).then(data =>
            {
                res.send(data);
            })
    }
    catch{
        res.status(401).send({message:"Sory Something went wrong during the process"})
    }
});

module.exports = router;


const UserModel = require('../ModelData/UserModel')
const fs = require('fs');
const { resolve } = require('path');

/*
1 Get All Users
2 Get One User
3 Update User
4 Delete User
5 Create User
6 User Sign in
7 Switch User Type
8 Check If User Exsite
*/

const GetAll = () =>
{
    return new Promise((resolve, reject) =>
    {
        UserModel.find({}, function(err, data)
        {
            if(err)
            {
                reject(err)
            }
            else
            {
                resolve(data)
            }
        })
    })

}

const GetUser = (id) =>{
    return new Promise((resolve,reject)=>{
        UserModel.findById(id, (err, data)=>
        {
            if(err)
            {
                reject(err)
            }
            else
            {
                resolve(data)
            }
        })
    })
}

const UpdateUser = (id,obj) =>{
    return new Promise((resolve,reject)=>{
        UserModel.findByIdAndUpdate(id,obj, { new: true }, (err, data)=>
        {
            if(err)
            {
                reject(err);
            }
            else
            {
                resolve({message:"User Updated!",NewUser:data})
            }
        })
    })
}

const DeleteUser = (id) =>
{
    return new Promise((resolve,reject)=>
    {
        UserModel.findByIdAndDelete(id,(err,data)=>
        {
            if(err)
            {
                reject(err)
            }
            else
            {
                fs.unlinkSync(data.Image);
                resolve({message:"User Deleted!"});
            }
        })
    })
}


const CreateUser = (obj,image) =>{
    return new Promise((resolve,reject)=>{
        CheckIfExsite(obj.Email).then(data => 
            {
                    if(data == null)
                    {
                        let User = new UserModel({
                            Name: obj.Name,
                            Password: obj.Password,
                            Email: obj.Email,
                            Favorit: obj.Favorit,
                            Image: image,
                            Type: "User",
                            Followed: obj.Followed
                        })
                        User.save((err)=>
                        {
                            if(err)
                            {
                                reject(err)
                            }
                            else
                            {
                                resolve('Created!')
                            }
                        })
                    }
                    else
                    {
                        if(image != "")
                            fs.unlinkSync(image);
                        resolve("This User Exsiting!")
                    }
                })
        })
}


const SignIn = (email,password) =>
{
    return new Promise((resolve,reject)=>
    {
        UserModel.findOne({ Email: email,Password:password}, (err, data)=>{
            if(err)
            {
                reject(err);
            }
            else
            {
                resolve(data);
            }
        })
    })
}



const SwitchType = (id,Type) =>
{
    const update = {Type:Type}
    return new Promise((resolve,reject)=>
    {
        UserModel.findByIdAndUpdate(id,update,(err,data)=>{
          if(err)
          {
              reject(err)
          }
          else
          {
             resolve(data._id)
          }
        });
    })
}


const CheckIfExsite = (Email) =>
{
    return new Promise((resolve,reject)=>
    {
        UserModel.findOne({Email:Email},(err, data)=>{
            if(err)
            {
                reject(err);
            }
            else
            {
                resolve(data);
            }
        })
    })
}

const UpdateProfileImage = (id,image) =>
{
    const update = {Image:image}
    return new Promise((resolve, reject)=>
    {
        UserModel.findByIdAndUpdate(id,update,(err,data)=>{
            if(err)
            {
                reject(err)
            }
            else
            {
               if(data.Image != "")
               {
                  fs.unlinkSync(data.Image);
               }
               resolve("The Image Is Updated!");
            }
          });
    })
}

const DeleteProfileImage = (id) =>
{
    const update = {Image:""}
    return new Promise((resolve,reject)=>
    {   
        UserModel.findByIdAndUpdate(id,update,(err,data)=>{
            if(err)
            {
                reject(err)
            }
            else
            {
              
               fs.unlinkSync(data.Image);
               resolve("The Image Is Deleted!");
            }
          });
    })
}

module.exports = {GetAll,GetUser,UpdateUser,CreateUser,DeleteUser,SignIn,SwitchType,UpdateProfileImage,DeleteProfileImage};
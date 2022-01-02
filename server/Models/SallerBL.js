const SallerModel = require('../ModelData/SallerModel');
const UserBL = require('./UserBL');

/*
1 Get All Saller
2 Get One Saller
3 Create Saller
4 Update Saller
5 Delete Saller
6 add Product To The Saller
7 Remove Product From Saller
*/


const GetAll = () =>
{
    return new Promise((resolve,reject)=>
    {
        SallerModel.find({},(err,data)=>
        {
            if(err)
            {
                reject(err);
            }
            else{
                resolve(data);
            }
        })
    })
}


const GetSallerWithUserId = (userId) =>
{
    return new Promise((resolve,reject) => 
    {
        SallerModel.findOne({userId:userId},(err,data)=>
        {
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

const GetSaller = (id) =>
{
    return new Promise((resolve,reject) => 
    {
        SallerModel.findById(id,(err,data)=>
        {
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



const CreateSaller = (obj) =>
{
    return new Promise((resolve,reject)=>
    {
        //Check If The saller dosn't exsite!
        GetSallerWithUserId(obj.userId).then(data =>
            {
                if(data != null)
                {
                    resolve({message:"Seller Exsite!",saller:null});
                }
                //Create saller
                else
                {
                    UserBL.SwitchType(obj.userId,"Saller").then(id =>{
                        let Saller = new SallerModel({
                            Products:[],
                            userId: id,
                            Name: obj.Name,
                            PhoneNumber: obj.PhoneNumber,
                            Addres: obj.Addres,
                            NumOfSalles:0,
                            Followers: []
                        });
                        Saller.save((err,data)=>
                        {
                            if(err)
                            {
                                reject(err)
                            }
                            else
                            {
                                resolve({message:"Created Saller",saller:data});
                            }
                        });
                    });
                }
            });
    });
}

const UpdateSaller = (id,obj) =>{
    return new Promise((resolve,reject)=>{
        SallerModel.findByIdAndUpdate(id,obj,{ new: true }, (err, data)=>
        {
            if(err)
            {
                reject(err)
            }
            else
            {
                resolve({message:"Saller Updated!",newSaller:data})
            }
        })
    })
}

const DeleteSaller = (id) =>
{
    return new Promise((resolve,reject)=>
    {
        SallerModel.findByIdAndDelete(id,(err,data)=>
        {
            if(err)
            {
                reject(err)
            }
            else
            {
            UserBL.SwitchType(data.userId,"User").then(info =>
                {
                    
                    resolve({message:"Saller Deleted! Change To Be User",Seller:data});
                });
            } 
        })
    })
}

const AddPrudoct = (sallerId,productId) =>
{
    return new Promise((resolve) =>
    {
        SallerModel.findOneAndUpdate({_id:sallerId}, {$push: {Products: productId}}, { new: true },(err,data)=>
        {
            if(err)
            {
                reject(err)
            }
            else
            {
                resolve(data);
            }
        })
    })
}

const RemoveProduct = (sallerId,productId) =>
{
    return new Promise((resolve,reject)=>
    {
        SallerModel.findOneAndUpdate({_id:sallerId},{$pull: {Products:productId}},{ new: true },(err,data)=>
        {
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

module.exports = {GetAll, CreateSaller, GetSaller, UpdateSaller, DeleteSaller, AddPrudoct, RemoveProduct, GetSallerWithUserId}
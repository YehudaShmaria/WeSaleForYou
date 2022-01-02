const ProductModel = require('../ModelData/ProductModel');
const SallerBL = require('./SallerBL')
const CategoryBL = require('./CategoryBL');
const fs = require('fs');

/*
1 Get all Products
2 Get one Product
3 Create Product
4 Update Product
5 Delete Product
*/

const GetAll = () =>
{
    return new Promise((resolve,reject)=>
    {
        ProductModel.find({},(err,data)=>
        {
            if(err)
            {
                reject(err);
            }
            else
            {
                resolve({message:"Bringing all the products was successful!",Products:data});
            }
        })
    })
}

const GetProduct = (id) =>
{
    return new Promise((resolve, reject)=>
    {
        ProductModel.findById(id, (err, data)=>
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

const CreateProduct = (obj,images) =>
{
    return new Promise((resolve, reject) =>
    {
        let Product = new ProductModel({
            Descrption: obj.Descrption,
            Name: obj.Name,
            sallerId: obj.sallerId,
            Category: obj.Category,
            Price:obj.Price,
            Images:images,
            Type: obj.Type
        })
        Product.save((err,data)=>
        {
            if(err)
            {
                reject(err)
            }
            else
            {
                let productId = data._id.toString();
                SallerBL.AddPrudoct(obj.sallerId,productId).then(data =>
                    {
                        CategoryBL.AddPrudoct(obj.Category,productId).then(massege =>
                            {
                                resolve({Saller:data,Message:massege});
                            })
                    })
            }
        })
    })
}

const UpdateProduct = (id,obj)=>
{
    return new Promise((resolve,reject)=>
    {
        GetProduct(id).then(data=>
            {
                if(data.Category !== obj.Category)
                {
                    CategoryBL.RemoveProduct(data.Category,id).then(data=>
                        {
                            CategoryBL.AddPrudoct(obj.Category,id);
                        });
                }
            });
        ProductModel.findByIdAndUpdate(id,obj,{ new: true },(err,data)=>
        {
            if(err)
            {
                reject(err);
            }
            else
            {
                resolve({message:"Product Updated!",newProduct:data});
            }
        });
    });
}

const DeleteProduct = (id) =>
{
    return new Promise((resolve,reject) =>
    {
        ProductModel.findByIdAndDelete(id, (err, data)=>
        {
            if(err)
            {
                reject(err);
            }
            else
            {
                if(data.Image)
                {
                    data.Images.forEach(element => {
                        fs.unlinkSync(element);              
                    });
                }
                let sallerId = data.sallerId.toString();
                SallerBL.RemoveProduct(sallerId,id).then(data => 
                    {
                        CategoryBL.RemoveProduct(data.Category,id).then(messege =>
                            {
                                
                                resolve({sallerUpdate:data,message:messege});
                            })
                    })
            }
        });
    });
}

const GetSallerProducts = (id) =>
{
    return new Promise((resolve,reject)=>
    {
        ProductModel.find({sallerId:id},(err,data)=>
        {
            if(err)
            {
                reject(err);
            }
            else
            {
                resolve({message:"Bringing all the products was successful!",Products:data});
            }
        })
    })
}

const DeleteSallerProducts = (id) =>
{
    return new Promise((resolve,reject)=>
    {
        ProductModel.deleteMany({sallerId:id},(err) =>
        {
            if(err)
            {
                reject(err);
            }
            else
            {
                resolve({message:"Deleted All Items!"});
            }
        })
    })
}


const DeleteImage = (id,image) =>
{
    return new Promise((resolve,reject)=>
    {
        ProductModel.findOneAndUpdate({_id:id},{$pull:{Images:image}},{ new: true },(err,data)=>
        {
            if(err)
            {
                reject(err);
            }
            else
            {
                fs.unlinkSync(image);
                resolve({message:"The Image Has Been Deleted!",newProduct:data});      
            }
        })
    })
}

const AddImage = (id,image) =>
{
    return new Promise((resolve,reject)=>
    {
        ProductModel.findOneAndUpdate({_id:id},{$push:{Images:image}},{ new: true },(err,data)=>
        {
            if(err)
            {
                reject(err);
            }
            else
            {
                resolve({message:"The Image Has Been Add to The Images",newProduct:data});      
            }
        })
    })
}


// const UpdateProductsImages = (id,updateImages,deleteImages) =>
// {
//     return new Promise((reject,resolve)=>
//     {
//         ProductModel.findOneAndUpdate({_id:id},{Images:updateImages},{ new: true },(err,data)=>
//         {
//             if(err)
//             {
//                 reject(err);
//             }
//             else
//             {
//                 console.log(deleteImages);
//                 if(deleteImages.length !== [''])
//                 {
//                     deleteImages.forEach(element => {
//                         fs.unlinkSync(element);              
//                     });
//                 }
//                 resolve({message:"The Images is Updated!",TheProduct:data});
//             }
//         })

//     })
// }


module.exports = {GetAll, GetProduct, CreateProduct, UpdateProduct, DeleteProduct, GetSallerProducts,DeleteSallerProducts,DeleteImage, AddImage}
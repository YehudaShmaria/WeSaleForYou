const CategoryModel = require('../ModelData/CategoryModel');
const MainCategoryBL = require('./MainCategoryBL')

/*
1 Get All Category
2 Get one Category
3 Create Category
4 Update Category
5 Delete Category
6 Add Product to the list
7 Remove Product from The list
*/

const GetAll = () =>
{
    return new Promise((resolve,reject)=>
        {
            CategoryModel.find({},(err,data)=>
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
        });
}

const GetCategory = (id) =>
{
    return new Promise((resolve,reject)=>
    {
        CategoryModel.findById(id,(err,data)=>
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

const CreateCategory = (obj) =>
{
    return new Promise((resolve,reject) =>
    {
        let category = new CategoryModel({
            Name: obj.Name,
            Type: obj.Type,
            Products: []
        })
        category.save((err,data)=>
        {
            if(err)
            {
                reject(err);
            }
            else
            {
                MainCategoryBL.AddCategory(data.Type,data._id);
                resolve({message:"Category Created!",Category:data});
            }
        })
    })
}

const UpdateCategory = (id, obj) =>
{
    return new Promise((resolve,reject)=>
    {
        CategoryModel.findByIdAndUpdate(id,obj, (err,data) =>
        {
            if(err)
            {
                reject(err);
            }
            else
            {
                resolve({message:"Category Updated!",Category:data});
            }
        })
    })
}

const DeleteCategory = (id) =>
{
    return new Promise((resolve,reject) =>
    {
        CategoryModel.findByIdAndDelete(id, (err, data) =>
        {
            if(err)
            {
                reject(err);
            }
            else
            {
                MainCategoryBL.RemoveCategory(data.Type,data._id);
                resolve(true);
            }
        })
    })
}

// const DeleteMain = () =>
// {
//     console.log("Test");
//     // return new Promise((resolve, reject) => 
//     // {
//     //     CategoryModel.deleteMany({Type:name},(err)=>
//     //     {
//     //         if(err)
//     //         {
//     //             reject(err);
//     //         }
//     //         else
//     //         {
//     //             resolve(true);
//     //         }
//     //     })
//     // })
// }

const GetAllInMain = (Type) =>
{
    return new Promise((resolve,reject)=>
    {
        CategoryModel.find({Type:Type},(err,data)=>
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

const AddPrudoct = (categoryName, productId) =>
{
    return new Promise((resolve, reject) =>
    {
        CategoryModel.findOneAndUpdate({Name:categoryName},{$push: {Products: productId}},(err)=>
        {
            if(err)
            {
                reject(err);
            }
            else
            {
                resolve("Add Product to the category!")
            }
        })
    })
}

const RemoveProduct = (categoryName, productId) =>
{
    return new Promise((resolve,reject)=>
    {
        CategoryModel.findOneAndUpdate({categoryName},{$pull: {Products:productId}},(err)=>
        {
            if(err)
            {
                reject(err);
            }
            else
            {
                resolve("Product Remove from Category");
            }
        })
    })
}

module.exports = {GetAll, GetCategory, CreateCategory, UpdateCategory, DeleteCategory, AddPrudoct, RemoveProduct, GetAllInMain};
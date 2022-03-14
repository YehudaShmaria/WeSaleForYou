const MainCategoryModel = require('../ModelData/MainCategory');
const categoryBL = require('./CategoryBL');
/*
1 Get All ManiCategory
2 Get one ManiCategory
3 Create ManiCategory
4 Update ManiCategory
5 Delete ManiCategory
6 Add Categry to the list
7 Remove Category from The list
*/

const GetAll = () => {
    return new Promise((resolve, reject) => {
        MainCategoryModel.find({}, (err, data) => {
            if (err) {
                reject(err);
            }
            else {
                resolve(data);
            }
        })
    });
}

const GetMainCategory = (id) => {
    return new Promise((resolve, reject) => {
        MainCategoryModel.findById(id, (err, data) => {
            if (err) {
                reject(err);
            }
            else {
                resolve(data);
            }
        })
    })
}

const CreateMainCategory = (obj) => {
    return new Promise((resolve, reject) => {
        let mainCategory = new MainCategoryModel({
            Name: obj.Name,
            Category: []
        })
        mainCategory.save((err, data) => {
            if (err) {
                reject(err);
            }
            else {
                resolve({ message: "Main Categroy Created!", MainCategory: data })
            }
        })
    })
}

const UpdateMainCategory = (id, obj) => {
    return new Promise((resolve, reject) => {
        MainCategoryModel.findByIdAndUpdate(id, obj, { new: true }, (err, data) => {
            if (err) {
                reject(err);
            }
            else {
                resolve({ message: "Main Category Updated!", MainCategory: data })
            }
        })
    })
}

const DeleteMainCategory = (id) => {
    return new Promise((resolve, reject) => {
        MainCategoryModel.findByIdAndDelete(id, (err, data) => {
            if (err) {
                reject(err);
            }
            else {
                resolve("MainCategory Deleted!");
                //categoryBL.DeleteMain()//.then(message => {
                //     if(message)
                //         resolve("MainCategory Deleted! + All the Category");
                //     else
                //         resolve("MainCategory Deleted!");
                // })
            }
        })
    })
}

const AddCategory = (mainCategoryName, categoryId) => {
    return new Promise((resolve, reject) => {
        MainCategoryModel.findOneAndUpdate({ Name: mainCategoryName }, { $push: { Category: categoryId } }, (err) => {
            if (err) {
                reject(err);
            }
            else {
                resolve("Add category to the category!")
            }
        })
    })
}

const RemoveCategory = (mainCategoryName, categoryId) => {
    return new Promise((resolve, reject) => {
        MainCategoryModel.findOneAndUpdate({ Name: mainCategoryName }, { $pull: { Category: categoryId } }, (err) => {
            if (err) {
                reject(err);
            }
            else {
                resolve("Remove Category from category!")
            }
        })
    })
}

module.exports = { GetAll, GetMainCategory, CreateMainCategory, UpdateMainCategory, DeleteMainCategory, AddCategory, RemoveCategory };
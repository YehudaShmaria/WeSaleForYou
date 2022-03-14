const mongoose = require('mongoose');

let MainCategorySchema = mongoose.Schema({
    Name: String,
    Category: Array
},
    { timestamps: true }
)

let MainCategoryModel = mongoose.model('MainCategoty', MainCategorySchema, 'MainCategory');

module.exports = MainCategoryModel;
const mongoose = require('mongoose');

let CategorySchema = mongoose.Schema({
    Name: String,
    Type: String,
    Products: Array
},
    { timestamps: true }
)

let CategoryModel = mongoose.model('Categoty', CategorySchema, 'Category');

module.exports = CategoryModel;
const mongoose = require('mongoose');
const { array } = require('../Middlewares/uploadImage');

let ProductSchema = new mongoose.Schema({
    Category:String,
    Descrption: String,
    Name:String,
    sallerId: String,
    Price:Number,
    Images:Array,
    Type: String
},
{ timestamps: true }
)

let ProductModel = new mongoose.model('Products',ProductSchema,'Products');
module.exports = ProductModel;
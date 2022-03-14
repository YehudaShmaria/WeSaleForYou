const mongoose = require('mongoose');
const { array } = require('../Middlewares/uploadImage');

let ProductSchema = new mongoose.Schema({
    Category: String,
    Modal: String,
    Descrption: String,
    Available: Boolean,
    sallerId: String,
    Price: Number,
    Images: Array,
    Link: String,
    PeopleLikede: Array,
},
    { timestamps: true }
)

let ProductModel = new mongoose.model('Products', ProductSchema, 'Products');
module.exports = ProductModel;
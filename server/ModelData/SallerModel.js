const mongoose = require('mongoose')

let SallerSchema = mongoose.Schema({
    Name: String,
    NumOfSalles: Number,
    PhoneNumber: String,
    Products: Array,
    userId: String,
    Addres: String,
    Followers:Array
},{ timestamps: true }
)

let SallerModel = new mongoose.model('Sallers',SallerSchema, 'Sallers')
module.exports = SallerModel;
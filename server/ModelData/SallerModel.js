const mongoose = require('mongoose')

let SallerSchema = mongoose.Schema({
    Name: String,
    Title: String,
    Rank: String,
    AboutMe: String,
    userId: String,
    Products: Array,
    Followers: Array
}, { timestamps: true }
)

let SallerModel = new mongoose.model('Sallers', SallerSchema, 'Sallers')
module.exports = SallerModel;
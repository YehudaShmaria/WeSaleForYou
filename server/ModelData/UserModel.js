const mongoose = require('mongoose');

let UserSchema = new mongoose.Schema({
    Name: String,
    Password: String,
    Email: String,
    Favorit: Array,
    Type: String,
    Image: String,
    Followed: Array
},
    { timestamps: true }
)

let UserModel = mongoose.model('Users', UserSchema, 'Users');
module.exports = UserModel;
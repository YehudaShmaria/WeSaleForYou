const mongoose = require('mongoose')
mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/saleForYou', () => {
    console.log("WE ARE CONNECTED")
});
//
//'mongodb+srv://yehuda:yehuda@21@cluster0.4fyv5.mongodb.net/weSaleForYou?retryWrites=true&w=majority'
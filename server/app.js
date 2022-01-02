const express = require('express');
const cors = require('cors');
const UserRouter = require('./Routers/UserRouter');
const ProductRouter = require('./Routers/ProductRouter');
const SallerRouter = require('./Routers/SallerRouter');
const CategoryRouter = require('./Routers/CategoryRouter');
const MainCategoryRouter = require('./Routers/MainCategoryRouter');
const ConversationRouter = require('./Routers/ConversationRouter');
const MessageRouter = require('./Routers/MessageRouter');
const AutoRouter = require('./Routers/AutoRouter');

const bodyParser = require('body-parser')
const app = express();
app.use(cors());
app.use(express.json());

require('./Configs/dataBase');
app.use('/uploads',express.static('uploads'))

const port = process.env.PORT || 5000;

app.get('/',(req,res)=>{
    res.send('Hi It start')
})

app.use('/user',UserRouter);
app.use('/product',ProductRouter);
app.use('/saller',SallerRouter);
app.use('/category',CategoryRouter);
app.use('/maincategory',MainCategoryRouter);
app.use('/conversation',ConversationRouter);
app.use('/message',MessageRouter);
app.use('/auto',AutoRouter);


app.listen(port,() =>{
    console.log(`You Are listening on port: ${port}`)
});
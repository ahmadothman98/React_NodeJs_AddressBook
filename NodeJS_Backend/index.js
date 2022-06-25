require("dotenv").config();
const express = require('express');
const mongoose = require('mongoose');

const userRouter = require('./src/user/controller.js');
const contactRouter = require('./src/contact/controller');

const DB_CONNECT = process.env.DB_CONNECT ;
mongoose.connect(DB_CONNECT,{
    useNewUrlParser:true,useUnifiedTopology:true
},(err)=>{
    if(err){
        console.log(err)
    }
    else{
        console.log("successfully connected")
    }
})



const app = express();

app.use(express.json());

app.use('/api/user', userRouter);
app.use('/api/contact', contactRouter);

app.listen(3000, () => {
    console.log('server running on port 3000')
})
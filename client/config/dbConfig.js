const mongoose = require('mongoose');
require('dotenv').config();
mongoose.connect(process.env.mongo_url)

const db= mongoose.connection;

db.on(`connected`, ()=>{
    console.log("Mongo db Connection Successful");

})

db.on(`error`, ()=>{
    console.log("Mongo db Connection Failed");

})
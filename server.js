const express = require("express");
const app = express();
require('dotenv').config()
const dbConfig = require("./client/config/dbConfig");
const port = process.env.PORT || 5000;
app.use(express.json())

const usersRoute = require('./client/routes/userRoutes')
const busesRoute = require('./client/routes/busesRoutes')
const bookingsRoute = require('./client/routes/BookingsRoutes');

app.use('/api/users',usersRoute);
app.use('/api/buses', busesRoute);
app.use('/api/bookings',bookingsRoute);

const path= require("path");
__dirname= path.resolve();
if(process.env.NODE_ENV === "production"){

    app.use(express.static("client/build"));

    app.get("*",(req,res)=>{
        res.sendFile(path.join(__dirname,'client/build/index.html'));
    });
}

app.listen(port, ()=> console.log(`Node server listening on port ${port}`));
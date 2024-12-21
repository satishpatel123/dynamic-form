const express = require('express');
const app=express()
require('dotenv').config({debug: true});
const cors = require('cors')
const bodyParser = require('body-parser')
const PORT = process.env.PORT || 8080;
const router = require('./router/router'); 
const database = require('./db/index');
app.use(cors('*'));
app.use(bodyParser.json({}));

app.use('*', (req,res, next)=>{
    console.log(`${req.method} ${req.originalUrl}`);
    next()
})

app.use('/api', router);

database.connect().then(()=>{
    console.log(`mogodb database connected!!`);
    app.listen(PORT, ()=>{
        console.log(`server is runnng on port ${PORT}`);
    })
}).catch(err=>{
    console.log(`error in connect to database!! err=${err.message}`);
})
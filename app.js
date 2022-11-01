const mongoose= require("mongoose")
const express = require ('express')
app = express();
const bodyParser = require('body-parser'); 
const routes = require("./Models/routes");
app.use(bodyParser.json())

app.use(routes)

app.listen(7500,()=>{
    console.log('Connected to http://localhost:7500')
});

mongoose.connect("mongodb://localhost/MarketDB")
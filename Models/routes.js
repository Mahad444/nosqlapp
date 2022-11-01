const express = require('express');
const routes = express.Router()
const Product = require('../Auths/productShema')
const products = require('../Auths/productShema')
const Customer = require('../Auths/customerSchema')
const {authentication} = require('../Auths/jwtHelper')
const creatError = require ('http-errors');




routes.post("/products",(req,res)=>{
    Product.create(req.body).then(products)
    res.send("Created successfully")
    
});
routes.post('/customerrs',async (req,res,next)=>{
    try{
   const {customerNumber,password,customerName} = await authentication.validateAsync(req.body)
   const exists = await Customer.findOne({customerNumber:customerNumber});
   if(exists) throw creatError.Conflict(` ${customerNumber} has already been registered `);
   const customer = new Customer({customerNumber,password,customerName})
   const savedUser= customer.save()
    res.send("saved User")
    }
    catch(err){
        next(err)


    }

})



module.exports = routes;
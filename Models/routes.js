const express = require('express');
const routes = express.Router()
const Product = require('../Auths/productShema')
// const products = require('../Auths/productShema')
const Customer = require('../Auths/customerSchema')
const {authentication} = require('../Auths/jwtHelper')
const creatError = require ('http-errors');
const {logInAccessToken,verifySuccessToken,newAccessToken} = require ('../tokens/login')


routes.get('/products',verifySuccessToken,(req,res)=>{
    Product.find({}).then((Product)=>{
        res.send(Product)
    })
});

routes.get('/customerrs',verifySuccessToken,(req,res)=>{
    Product.find({}).then((Product)=>{
        res.send(Product)
    })
});



routes.post('/products',(req,res)=>{
   Product.create(req.body).then(Product)
   res.send("Saved Products")
})
routes.post('/customerrs',async (req,res,next)=>{
    try{
   const {customerNumber,password,customerName} = await authentication.validateAsync(req.body)
   const exists = await Customer.findOne({customerNumber:customerNumber});
   if(exists) throw creatError.Conflict(` ${customerNumber} has already been registered `);
   const customer = new Customer({customerNumber,password,customerName})
   const savedUser= await  customer.save()
   const successToken = await logInAccessToken(savedUser.id)
   const newToken = await newAccessToken(savedUser.id)
    res.send({successToken,newAccessToken})
    }
    catch(err){
        next(err)


    } 

})

routes.post('/login',async (req,res,next)=>{
    try{
    const {customerNumber,password,customerName} = await authentication.validateAsync(req.body);
    const customer = await  Customer.findOne({customerNumber:customerNumber,password,customerName}) ;
    if (!customer) throw creatError.NotFound("Not Registered User");
    
    const matching = await [customer.password,customer.customerName,customer.customerNumber]
    if(!matching) throw creatError.Unauthorized("Invalid Customer,phoneNumber or password");
     
    const successToken = await logInAccessToken(customer.id)
    const newToken = await newAccessToken(customer.id)
    res.send({successToken,newToken})

    }catch(error){
        if (error.isjoi===true) 
            return next(creatError.BadRequest("invalid username or password"))
        next(error) 
    }
})
 
module.exports = routes;
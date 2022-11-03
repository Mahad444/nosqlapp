const JWT = require('jsonwebtoken')
const creatError = require ('http-errors')
require('dotenv').config()

module.exports = {
    logInAccessToken:(CustomerId) =>{
        return new Promise ((resolve,reject) =>{
            const payload ={};
            const secret =process.env.SUCCESS_TOKEN;  
            const options ={
                expiresIn :'1hr',
                issuer:'Duke Technologies.com',
                audience:`${CustomerId}`,
            } 
            JWT.sign(payload,secret,options,(error,token)=>{
                if(error) reject(error);
                resolve(token);
            })
        })
    },
    verifySuccessToken:(req,res,next)=>{
        if (!req.headers["authorization"])
        return next (creatError.Unauthorized());
        const authHeader = req.headers["authorization"];
        const bearerToken =authHeader.split('');
        const token = bearerToken[1];
        JWT.verify(token,process.env.SUCCESS_TOKEN,(err,payload)=>{
            if(err){
                return next(creatError.Unauthorized())
            }
            req.payload = payload;
            next()
        })
    }
}
const mongoose = require('mongoose');
const Schema = mongoose.Schema
const hashing = require('bcrypt')

const customerSchema = new Schema({
    customerName:{
        type:String,
        required:[false, "Name is Required"] 
    },
    customerNumber:{
        type:String,
        required:[true,"phone number Is Required"]
    },
    password:{
        type:String,
        required:[true,"Password is Required"]
    }
})


customerSchema.pre('save',async function(next){
    try{
        const salt = await hashing.genSalt(10);
        const hashedPassword = await hashing.hash(this.password, salt);
        this.password =hashedPassword;
        next();

    }catch(error){
        next(error)
    }
});
customerSchema.methods.isValidPassword = async function(password){
    try{
        return await hashing.compare(password,this.password);
    }catch(error){
        throw error;
    }
    
 }






const Customer = mongoose.model('customerrs',customerSchema);

module.exports = Customer;
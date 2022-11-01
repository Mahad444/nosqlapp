const mongoose = require('mongoose');
const Schema = mongoose.Schema

const customerSchema = new Schema({
    customerName:{
        type:String,
        required:[true , "Name is Required"]
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

const Customer = mongoose.model('customerrs',customerSchema);

module.exports = Customer;
const mongoose = require('mongoose')
const Schema = mongoose.Schema

const productShema = new Schema({
    productName:{
        type:String,
        required:[true,"ProductName is Required"]
    },
    price:{
        type:String,
        required:[true,"Price should be passed"]
    }
})

const Product = mongoose.model('products',productShema)
module.exports = Product;
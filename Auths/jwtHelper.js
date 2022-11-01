
const joi = require('joi')
const authentication = joi.object({
    customerName:joi.string().required(),
    customerNumber:joi.string().required(),
    password:joi.string().min(6).required()
})

module.exports ={authentication}